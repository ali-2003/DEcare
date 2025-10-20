import { NextRequest, NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/brevo';
import { getIntakeEmailTemplate } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const intakeData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      medicalHistory: formData.get('medicalHistory') as string,
      currentMedications: formData.get('currentMedications') as string,
      allergies: formData.get('allergies') as string,
      diabetesType: formData.get('diabetesType') as string,
      diagnosisYear: formData.get('diagnosisYear') as string,
      currentTreatment: formData.get('currentTreatment') as string,
      emergencyContactName: formData.get('emergencyContactName') as string,
      emergencyContactPhone: formData.get('emergencyContactPhone') as string,
      emergencyContactRelation: formData.get('emergencyContactRelation') as string,
      insuranceProvider: formData.get('insuranceProvider') as string,
      insurancePolicyNumber: formData.get('insurancePolicyNumber') as string,
      reasonForVisit: formData.get('reasonForVisit') as string,
      additionalNotes: formData.get('additionalNotes') as string,
      consentAgreed: formData.get('consentAgreed') as string,
      consentDate: formData.get('consentDate') as string,
    };

    // Get uploaded files
    const medicalRecords = formData.get('medicalRecords') as File;
    const laboratoryResults = formData.get('laboratoryResults') as File;
    const otherDocuments = formData.get('otherDocuments') as File;

    console.log('\n' + '='.repeat(60));
    console.log('✅ PATIENT INTAKE FORM SUBMITTED');
    console.log('='.repeat(60));
    console.log('Patient:', intakeData.firstName, intakeData.lastName);
    console.log('Email:', intakeData.email);
    console.log('Diabetes Type:', intakeData.diabetesType);
    console.log('Consent Agreed:', intakeData.consentAgreed);
    console.log('Consent Date:', intakeData.consentDate);
    console.log('Time:', new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    console.log('='.repeat(60) + '\n');

    // Convert files to attachments
    const attachments = [];
    
    if (medicalRecords) {
      const buffer = await medicalRecords.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `medical-records.pdf`
      });
    }
    
    if (laboratoryResults) {
      const buffer = await laboratoryResults.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `laboratory-results.pdf`
      });
    }
    
    if (otherDocuments) {
      const buffer = await otherDocuments.arrayBuffer();
      attachments.push({
        content: Buffer.from(buffer).toString('base64'),
        name: `other-documents.pdf`
      });
    }

    // Send email to doctor
    try {
      await sendBrevoEmail({
        to: process.env.BREVO_DOCTOR_EMAIL || 'doctor@diabetesendocare.org',
        subject: `New Patient Intake: ${intakeData.firstName} ${intakeData.lastName}`,
        htmlContent: getIntakeEmailTemplate(intakeData),
        attachments: attachments
      });
      console.log('✅ Intake form email sent successfully');
    } catch (emailError) {
      console.error('❌ Error sending intake email:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Intake form submitted! We will review your information and contact you shortly.',
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error processing intake form:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process intake form',
      },
      { status: 500 }
    );
  }
}