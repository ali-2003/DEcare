import { NextRequest, NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/brevo';
import { getNewPatientEmailTemplate } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await sendBrevoEmail({
      to: email,
      subject: 'Complete Your Patient Intake Form - Diabetes & Endocrinology Care Clinic',
      htmlContent: getNewPatientEmailTemplate(email)
    });

    console.log('✅ New patient intake email sent to:', email);

    return NextResponse.json(
      { success: true, message: 'Intake form link sent to your email!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending new patient email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}