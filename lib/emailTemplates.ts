// lib/emailTemplates.ts

interface PatientData {
  patientName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
}

interface CheckInData extends PatientData {
  firstName: string;
  lastName: string;
  city?: string;
  state?: string;
  zipCode?: string;
  insuranceCardId?: string;
}

export function getAppointmentEmailTemplate(patientData: PatientData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info-row {
      display: flex;
      margin: 10px 0;
      padding: 10px 0;
      border-bottom: 1px solid #e9ecef;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: bold;
      color: #667eea;
      min-width: 140px;
    }
    .info-value {
      color: #333;
    }
    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      margin: 20px 0;
      text-align: center;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
    }
    .alert {
      background: #fff3cd;
      border: 1px solid #ffc107;
      color: #856404;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hospital New Patient Appointment Request</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Diabetes & Endocrinology Care Clinic</p>
    </div>
    
    <div class="content">
      <p style="font-size: 18px; color: #667eea; font-weight: bold;">Patient Information Saved</p>
      <p>A new patient has filled out their information and is ready to schedule an appointment.</p>
      
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Patient Name:</span>
          <span class="info-value">${patientData.patientName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${patientData.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value">${patientData.phone}</span>
        </div>
        ${patientData.dateOfBirth ? `
        <div class="info-row">
          <span class="info-label">Date of Birth:</span>
          <span class="info-value">${patientData.dateOfBirth}</span>
        </div>
        ` : ''}
        ${patientData.address ? `
        <div class="info-row">
          <span class="info-label">Address:</span>
          <span class="info-value">${patientData.address}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">Submitted:</span>
          <span class="info-value">${new Date().toLocaleString('en-US', { 
            timeZone: 'America/Chicago',
            dateStyle: 'full',
            timeStyle: 'short'
          })}</span>
        </div>
      </div>

      <div class="alert">
        <strong>Action Required:</strong> Please check Practice Fusion for their appointment scheduling request.
      </div>

      <div style="text-align: center;">
        <a href="https://www.patientfusion.com/doctor/sana-meah-do-23637" class="action-button">
          Open Practice Fusion
        </a>
      </div>

      <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
        This is an automated notification from your website appointment system.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Diabetes & Endocrinology Care Clinic</strong></p>
      <p>Phone: (630) 866-6334 | Address: 4121 Fairview Ave # L2, Downers Grove, IL 60515</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getCheckInEmailTemplate(checkInData: CheckInData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 700px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .alert-success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #2563eb;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #2563eb;
      margin: 25px 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e9ecef;
    }
    .info-row {
      display: flex;
      margin: 10px 0;
      padding: 10px 0;
      border-bottom: 1px solid #e9ecef;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: bold;
      color: #2563eb;
      min-width: 160px;
    }
    .info-value {
      color: #333;
    }
    .documents-section {
      background: #fff3cd;
      border: 2px solid #ffc107;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Patient Check-In Complete</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Diabetes & Endocrinology Care Clinic</p>
    </div>
    
    <div class="content">
      <div class="alert-success">
        A patient has successfully checked in at your clinic!
      </div>

      <div class="section-title">Patient Information</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Full Name:</span>
          <span class="info-value">${checkInData.firstName} ${checkInData.lastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${checkInData.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value">${checkInData.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date of Birth:</span>
          <span class="info-value">${checkInData.dateOfBirth || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">Address</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Street Address:</span>
          <span class="info-value">${checkInData.address || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">City:</span>
          <span class="info-value">${checkInData.city || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">State:</span>
          <span class="info-value">${checkInData.state || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">ZIP Code:</span>
          <span class="info-value">${checkInData.zipCode || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">Insurance Information</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Insurance Card ID:</span>
          <span class="info-value">${checkInData.insuranceCardId || 'Not provided'}</span>
        </div>
      </div>

      <div class="documents-section">
        <strong>Attached Documents:</strong>
        <ul style="margin: 10px 0 0 0; padding-left: 20px;">
          <li>Insurance Card - Front Side</li>
          <li>Insurance Card - Back Side</li>
          <li>Photo ID - Front Side</li>
          <li>Photo ID - Back Side</li>
          <li>Additional documents (if any)</li>
        </ul>
        <p style="margin-top: 15px; color: #856404;">
          <strong>Note:</strong> All scanned documents are attached to this email for your review.
        </p>
      </div>

      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Check-In Time:</span>
          <span class="info-value">${new Date().toLocaleString('en-US', { 
            timeZone: 'America/Chicago',
            dateStyle: 'full',
            timeStyle: 'short'
          })}</span>
        </div>
      </div>

      <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
        This is an automated notification from your clinic check-in kiosk system.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Diabetes & Endocrinology Care Clinic</strong></p>
      <p>Phone: (630) 866-6334 | Address: 4121 Fairview Ave # L2, Downers Grove, IL 60515</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getIntakeEmailTemplate(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .alert-success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #2563eb;
      margin: 25px 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e9ecef;
    }
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #2563eb;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info-row {
      display: flex;
      margin: 10px 0;
      padding: 10px 0;
      border-bottom: 1px solid #e9ecef;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: bold;
      color: #2563eb;
      min-width: 200px;
    }
    .info-value {
      color: #333;
      word-break: break-word;
    }
    .textarea-value {
      background: #fff;
      padding: 10px;
      border-radius: 3px;
      border-left: 2px solid #2563eb;
      margin-top: 5px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .documents-section {
      background: #e3f2fd;
      border: 2px solid #2196F3;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .consent-box {
      background: #fff3cd;
      border: 2px solid #ffc107;
      padding: 25px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .consent-title {
      font-size: 18px;
      font-weight: bold;
      color: #856404;
      margin-bottom: 15px;
    }
    .consent-content {
      background: #fffbf0;
      padding: 15px;
      border-radius: 3px;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 1.8;
    }
    .consent-signature {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 3px;
      border-left: 3px solid #ffc107;
    }
    .consent-sig-line {
      margin: 8px 0;
      font-weight: 600;
      color: #333;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Patient Intake Form Submitted</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Diabetes & Endocrinology Care Clinic</p>
    </div>
    
    <div class="content">
      <div class="alert-success">
        A new patient has completed their intake form and is ready for their appointment!
      </div>

      <div class="section-title">Personal Information</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Full Name:</span>
          <span class="info-value">${data.firstName} ${data.lastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${data.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value">${data.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date of Birth:</span>
          <span class="info-value">${data.dateOfBirth || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">Address</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Street Address:</span>
          <span class="info-value">${data.address || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">City:</span>
          <span class="info-value">${data.city || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">State:</span>
          <span class="info-value">${data.state || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">ZIP Code:</span>
          <span class="info-value">${data.zipCode || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">Medical History</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Diabetes Type:</span>
          <span class="info-value">${data.diabetesType}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Year of Diagnosis:</span>
          <span class="info-value">${data.diagnosisYear || 'Not provided'}</span>
        </div>
        ${data.currentTreatment ? `
        <div class="info-row">
          <span class="info-label">Current Diabetes Treatment:</span>
          <span class="info-value"></span>
        </div>
        <div class="textarea-value">${data.currentTreatment}</div>
        ` : ''}
        ${data.medicalHistory ? `
        <div class="info-row" style="margin-top: 15px;">
          <span class="info-label">Other Medical Conditions:</span>
          <span class="info-value"></span>
        </div>
        <div class="textarea-value">${data.medicalHistory}</div>
        ` : ''}
        ${data.currentMedications ? `
        <div class="info-row" style="margin-top: 15px;">
          <span class="info-label">Current Medications:</span>
          <span class="info-value"></span>
        </div>
        <div class="textarea-value">${data.currentMedications}</div>
        ` : ''}
        ${data.allergies ? `
        <div class="info-row" style="margin-top: 15px;">
          <span class="info-label">Allergies:</span>
          <span class="info-value"></span>
        </div>
        <div class="textarea-value">${data.allergies}</div>
        ` : ''}
      </div>

      <div class="section-title">Emergency Contact</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Contact Name:</span>
          <span class="info-value">${data.emergencyContactName || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value">${data.emergencyContactPhone || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Relationship:</span>
          <span class="info-value">${data.emergencyContactRelation || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">Insurance Information</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Insurance Provider:</span>
          <span class="info-value">${data.insuranceProvider || 'Not provided'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Policy Number:</span>
          <span class="info-value">${data.insurancePolicyNumber || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">Visit Details</div>
      <div class="info-box">
        ${data.reasonForVisit ? `
        <div class="info-row">
          <span class="info-label">Reason for Visit:</span>
          <span class="info-value"></span>
        </div>
        <div class="textarea-value">${data.reasonForVisit}</div>
        ` : ''}
        ${data.additionalNotes ? `
        <div class="info-row" style="margin-top: 15px;">
          <span class="info-label">Additional Notes:</span>
          <span class="info-value"></span>
        </div>
        <div class="textarea-value">${data.additionalNotes}</div>
        ` : ''}
      </div>

      <div class="documents-section">
        <strong>Attached Documents:</strong>
        <ul style="margin: 10px 0 0 0; padding-left: 20px;">
          <li>Medical Records (if uploaded)</li>
          <li>Laboratory Results (if uploaded)</li>
          <li>Other Documents (if uploaded)</li>
        </ul>
      </div>

      <div class="consent-box">
        <div class="consent-title">Patient Consent Acknowledgment</div>
        <div class="consent-content">
          The patient has read and agreed to the patient intake form and consent form acknowledging that they have provided truthful and complete information. The patient acknowledges understanding that:
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>The information provided will be used to facilitate medical care and treatment</li>
            <li>Medical records will be kept confidential in accordance with HIPAA regulations</li>
            <li>All relevant medical history, medications, and allergies have been disclosed</li>
            <li>The clinic will be notified of any changes to medical information</li>
            <li>The physician may contact using the provided contact information for medical purposes</li>
          </ul>
        </div>
        <div class="consent-signature">
          <div class="consent-sig-line">Patient Name: ${data.firstName} ${data.lastName}</div>
          <div class="consent-sig-line">Digital Signature: Electronically Signed</div>
          <div class="consent-sig-line">Consent Date & Time: ${data.consentDate}</div>
          <div class="consent-sig-line">Consent Status: Agreed</div>
        </div>
      </div>

      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Form Submitted:</span>
          <span class="info-value">${new Date().toLocaleString('en-US', { 
            timeZone: 'America/Chicago',
            dateStyle: 'full',
            timeStyle: 'short'
          })}</span>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Diabetes & Endocrinology Care Clinic</strong></p>
      <p>Phone: (630) 866-6334 | Address: 4121 Fairview Ave # L2, Downers Grove, IL 60515</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getNewPatientEmailTemplate(patientEmail: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .welcome-message {
      font-size: 18px;
      color: #333;
      margin: 20px 0;
    }
    .info-box {
      background: #f0f9ff;
      border-left: 4px solid #2563eb;
      padding: 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .info-box h3 {
      margin-top: 0;
      color: #2563eb;
    }
    .info-box ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .info-box li {
      margin: 8px 0;
    }
    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      margin: 20px 0;
      text-align: center;
      font-size: 16px;
    }
    .action-button:hover {
      opacity: 0.9;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome!</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Complete Your Patient Intake Form</p>
    </div>
    
    <div class="content">
      <div class="welcome-message">
        Thank you for choosing <strong>Diabetes & Endocrinology Care Clinic</strong>! We're excited to welcome you as a new patient.
      </div>

      <p>To complete your new patient registration, please fill out our comprehensive patient intake form. This will help us provide you with the best possible care.</p>

      <div class="info-box">
        <h3>The intake form will ask for:</h3>
        <ul>
          <li>Complete personal and demographic information</li>
          <li>Complete medical history</li>
          <li>Current medications and allergies</li>
          <li>Diabetes type and treatment information</li>
          <li>Emergency contact information</li>
          <li>Insurance details</li>
          <li>Reason for visit and additional notes</li>
          <li>Any relevant medical documents</li>
          <li>Patient consent acknowledgment</li>
        </ul>
      </div>

      <p>The form is designed to take about 20-25 minutes to complete. You can upload relevant medical documents, laboratory results, and other healthcare records.</p>

      <div class="button-container">
        <a href="diabetesendocare.org/patient-intake" class="action-button">
          Complete Intake Form
        </a>
      </div>

      <div class="info-box">
        <strong>What happens next?</strong>
        <p>Once you submit the form, our team will review your information and contact you to schedule your appointment. Please make sure all information provided is accurate and up to date.</p>
      </div>

      <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
        If you have any questions or need assistance, please don't hesitate to contact us at <strong>(630) 866-6334</strong>.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Diabetes & Endocrinology Care Clinic</strong></p>
      <p>Phone: (630) 866-6334 | Address: 4121 Fairview Ave # L2, Downers Grove, IL 60515</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
  `;
}