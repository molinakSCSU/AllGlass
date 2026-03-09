import { NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const QUOTE_TO_EMAIL = process.env.QUOTE_TO_EMAIL ?? 'allglassct@gmail.com';

type QuotePayload = {
  address?: string;
  email?: string;
  name?: string;
  phone?: string;
  projectNotes?: string;
  serviceNeeded?: string;
};

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  let body: QuotePayload;

  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  const payload = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    serviceNeeded: clean(body.serviceNeeded),
    projectNotes: clean(body.projectNotes),
    address: clean(body.address),
  };
  const escapedPayload = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone),
    serviceNeeded: escapeHtml(payload.serviceNeeded),
    projectNotes: escapeHtml(payload.projectNotes),
    address: escapeHtml(payload.address || 'Not provided'),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.serviceNeeded || !payload.projectNotes) {
    return NextResponse.json(
      { message: 'Name, email, phone, service, and project details are required.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    return NextResponse.json(
      { message: 'Quote submissions are not configured yet.' },
      { status: 500 }
    );
  }

  let response: Response;

  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [QUOTE_TO_EMAIL],
        subject: `New quote request: ${payload.serviceNeeded}`,
        reply_to: payload.email,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Service needed: ${payload.serviceNeeded}`,
          `Address or town: ${payload.address || 'Not provided'}`,
          '',
          'Project details:',
          payload.projectNotes,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #24364c;">
            <h2 style="margin: 0 0 16px;">New Quote Request</h2>
            <p><strong>Name:</strong> ${escapedPayload.name}</p>
            <p><strong>Email:</strong> ${escapedPayload.email}</p>
            <p><strong>Phone:</strong> ${escapedPayload.phone}</p>
            <p><strong>Service needed:</strong> ${escapedPayload.serviceNeeded}</p>
            <p><strong>Address or town:</strong> ${escapedPayload.address}</p>
            <p><strong>Project details:</strong></p>
            <p style="white-space: pre-line;">${escapedPayload.projectNotes}</p>
          </div>
        `,
      }),
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the quote service right now. Please try again shortly.' },
      { status: 502 }
    );
  }

  const result = (await response.json().catch(() => null)) as
    | { id?: string; message?: string; name?: string }
    | null;

  if (!response.ok || !result?.id) {
    return NextResponse.json(
      { message: result?.message ?? 'Unable to submit quote request right now.' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: 'Quote request sent successfully. We will follow up shortly.',
  });
}
