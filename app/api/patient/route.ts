import { NextRequest, NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/brevo';
import { getAppointmentEmailTemplate } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const patientData = {
      patientName: body.patientName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth || null,
      address: body.address || null,
    };

    // Log patient data
    console.log('\n' + '='.repeat(60));
    console.log('📋 NEW PATIENT INFORMATION SAVED');
    console.log('='.repeat(60));
    console.log('Patient Name:', patientData.patientName);
    console.log('Email:', patientData.email);
    console.log('Phone:', patientData.phone);
    console.log('Date of Birth:', patientData.dateOfBirth);
    console.log('Address:', patientData.address);
    console.log('Submitted:', new Date().toISOString());
    console.log('='.repeat(60) + '\n');

    // Send email to doctor via Brevo
    try {
      await sendBrevoEmail({
        to: process.env.BREVO_DOCTOR_EMAIL || 'doctor@diabetesendocare.org',
        subject: `New Patient Appointment Request - ${patientData.patientName}`,
        htmlContent: getAppointmentEmailTemplate(patientData),
      });
      console.log('✅ Email sent successfully to doctor');
    } catch (emailError) {
      console.error('❌ Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Patient information saved successfully',
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error processing patient info:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process patient information',
      },
      { status: 500 }
    );
  }
}