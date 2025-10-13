import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate a unique appointment ID
    const appointmentId = `APT-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    // Create appointment object
    const appointment = {
      id: appointmentId,
      patientName: body.patientName || 'N/A',
      email: body.email || 'N/A',
      phone: body.phone || 'N/A',
      dateOfBirth: body.dateOfBirth || null,
      address: body.address || null,
      appointmentDate: body.appointmentDate || 'N/A',
      serviceType: body.serviceType || 'N/A',
      reason: body.reason || 'N/A',
      symptoms: body.symptoms || null,
      additionalNotes: body.additionalNotes || null,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      submittedDate: new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        dateStyle: 'full',
        timeStyle: 'short'
      })
    };
    
    // Log appointment details to console (visible in deployment logs)
    console.log('\n' + '='.repeat(60));
    console.log('🏥 NEW APPOINTMENT REQUEST');
    console.log('='.repeat(60));
    console.log(`📋 Appointment ID: ${appointment.id}`);
    console.log(`👤 Patient Name: ${appointment.patientName}`);
    console.log(`📧 Email: ${appointment.email}`);
    console.log(`📱 Phone: ${appointment.phone}`);
    console.log(`🎂 Date of Birth: ${appointment.dateOfBirth || 'Not provided'}`);
    console.log(`🏠 Address: ${appointment.address || 'Not provided'}`);
    console.log(`📅 Appointment Date: ${appointment.appointmentDate}`);
    console.log(`🩺 Service Type: ${appointment.serviceType}`);
    console.log(`📝 Reason: ${appointment.reason}`);
    console.log(`🤒 Symptoms: ${appointment.symptoms || 'Not provided'}`);
    console.log(`💬 Additional Notes: ${appointment.additionalNotes || 'None'}`);
    console.log(`✅ Status: ${appointment.status}`);
    console.log(`⏰ Submitted: ${appointment.submittedDate}`);
    console.log('='.repeat(60) + '\n');
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request received successfully! We will contact you soon.',
        appointmentId: appointment.id,
        submittedAt: appointment.submittedAt
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    // Log error details
    console.error('\n' + '❌'.repeat(30));
    console.error('ERROR processing appointment:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('❌'.repeat(30) + '\n');
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process appointment request. Please try again or call us directly.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Optional GET endpoint to check if API is working
export async function GET() {
  return NextResponse.json(
    {
      status: 'operational',
      service: 'Diabetes & Endocrinology Care Clinic - Appointment API',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}