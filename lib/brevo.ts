// lib/brevo.ts

interface EmailAttachment {
  content: string;
  name: string;
}

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: EmailAttachment[];
}

export async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  attachments = []
}: SendEmailParams) {
  try {
    console.log('\n🔵 Attempting to send email via Brevo...');
    console.log('📧 To:', to);
    console.log('📋 Subject:', subject);
    console.log('📎 Attachments:', attachments.length);
    console.log('🔑 API Key exists:', !!process.env.BREVO_API_KEY);
    console.log('🔑 API Key (first 10 chars):', process.env.BREVO_API_KEY?.substring(0, 10));

    const payload = {
      sender: {
        name: 'Diabetes & Endocrinology Care Clinic',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@diabetesendocare.org'
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: htmlContent,
      attachment: attachments.length > 0 ? attachments : undefined
    };

    console.log('📤 Sending to Brevo API...');
    console.log('Sender:', payload.sender);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📥 Brevo Response Status:', response.status);

    const responseData = await response.json();
    console.log('📥 Brevo Response Data:', responseData);

    if (!response.ok) {
      console.error('❌ Brevo API Error:', responseData);
      throw new Error(`Brevo API error: ${JSON.stringify(responseData)}`);
    }

    console.log('✅ Email sent successfully!');
    return responseData;
  } catch (error: any) {
    console.error('\n❌ ERROR SENDING EMAIL:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('\n');
    throw error;
  }
}