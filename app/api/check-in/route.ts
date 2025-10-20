import { NextRequest, NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/brevo';
import { getCheckInEmailTemplate } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const checkInData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string || '',
      phone: formData.get('phone') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      insuranceCardId: formData.get('insuranceCardId') as string,
      patientName: `${formData.get('firstName')} ${formData.get('lastName')}`,
    };

    // Extract files
    const insuranceFront = formData.get('insuranceFront') as File;
    const insuranceBack = formData.get('insuranceBack') as File;
    const idFront = formData.get('idFront') as File;
    const idBack = formData.get('idBack') as File;
    
    // Get additional docs
    const additionalDocs: File[] = [];
    let i = 0;
    while (formData.get(`additionalDoc${i}`)) {
      additionalDocs.push(formData.get(`additionalDoc${i}`) as File);
      i++;
    }

    // Log check-in
    console.log('\n' + '='.repeat(60));
    console.log('✅ PATIENT CHECK-IN COMPLETE');
    console.log('='.repeat(60));
    console.log('Patient:', checkInData.firstName, checkInData.lastName);
    console.log('Email:', checkInData.email);
    console.log('Phone:', checkInData.phone);
    console.log('Documents:', {
      insuranceFront: insuranceFront?.name,
      insuranceBack: insuranceBack?.name,
      idFront: idFront?.name,
      idBack: idBack?.name,
      additionalDocs: additionalDocs.length
    });
    console.log('Time:', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    console.log('='.repeat(60) + '\n');

    // Convert files to attachments
    const attachments = [];
    
    if (insuranceFront) {
      const buffer = await insuranceFront.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `insurance-card-front.jpg`
      });
    }
    
    if (insuranceBack) {
      const buffer = await insuranceBack.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `insurance-card-back.jpg`
      });
    }
    
    if (idFront) {
      const buffer = await idFront.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `photo-id-front.jpg`
      });
    }
    
    if (idBack) {
      const buffer = await idBack.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `photo-id-back.jpg`
      });
    }

    // Add additional docs
    for (let j = 0; j < additionalDocs.length; j++) {
      const buffer = await additionalDocs[j].arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `additional-document-${j + 1}.jpg`
      });
    }

    // Send email with attachments
    try {
      await sendBrevoEmail({
        to: process.env.BREVO_DOCTOR_EMAIL || 'doctor@diabetesendocare.org',
        subject: `Patient Check-In: ${checkInData.firstName} ${checkInData.lastName}`,
        htmlContent: getCheckInEmailTemplate(checkInData),
        attachments: attachments
      });
      console.log('✅ Check-in email sent successfully with', attachments.length, 'attachments');
    } catch (emailError) {
      console.error('❌ Error sending check-in email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Check-in complete! Doctor has been notified.',
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error processing check-in:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process check-in',
      },
      { status: 500 }
    );
  }
}