import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Save to Sanity
    const appointment = await client.create({
      _type: 'appointment',
      patientName: body.patientName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth || null,
      address: body.address || null,
      appointmentDate: body.appointmentDate,
      serviceType: body.serviceType,
      reason: body.reason,
      symptoms: body.symptoms || null,
      additionalNotes: body.additionalNotes || null,
      status: 'pending',
      submittedAt: new Date().toISOString()
    });
    
    console.log('Appointment saved:', appointment._id);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Appointment request received successfully',
        appointmentId: appointment._id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving appointment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process appointment request' 
      },
      { status: 500 }
    );
  }
}