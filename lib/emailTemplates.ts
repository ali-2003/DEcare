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
      <h1>🏥 New Patient Appointment Request</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Diabetes & Endocrinology Care Clinic</p>
    </div>
    
    <div class="content">
      <p style="font-size: 18px; color: #667eea; font-weight: bold;">📋 Patient Information Saved</p>
      <p>A new patient has filled out their information and is ready to schedule an appointment.</p>
      
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">👤 Patient Name:</span>
          <span class="info-value">${patientData.patientName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📧 Email:</span>
          <span class="info-value">${patientData.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📱 Phone:</span>
          <span class="info-value">${patientData.phone}</span>
        </div>
        ${patientData.dateOfBirth ? `
        <div class="info-row">
          <span class="info-label">🎂 Date of Birth:</span>
          <span class="info-value">${patientData.dateOfBirth}</span>
        </div>
        ` : ''}
        ${patientData.address ? `
        <div class="info-row">
          <span class="info-label">🏠 Address:</span>
          <span class="info-value">${patientData.address}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">⏰ Submitted:</span>
          <span class="info-value">${new Date().toLocaleString('en-US', { 
            timeZone: 'America/Chicago',
            dateStyle: 'full',
            timeStyle: 'short'
          })}</span>
        </div>
      </div>

      <div class="alert">
        <strong>⚠️ Action Required:</strong> Please check Practice Fusion for their appointment scheduling request.
      </div>

      <div style="text-align: center;">
        <a href="https://www.patientfusion.com/doctor/sana-meah-do-23637" class="action-button">
          📅 Open Practice Fusion
        </a>
      </div>

      <p style="margin-top: 30px; color: #6c757d; font-size: 14px;">
        This is an automated notification from your website appointment system.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Diabetes & Endocrinology Care Clinic</strong></p>
      <p>📞 (630) 234-4466 | 📍 Oak Brook, IL • Munster, IN • Winfield, IL</p>
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
      <h1>✅ Patient Check-In Complete</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Diabetes & Endocrinology Care Clinic</p>
    </div>
    
    <div class="content">
      <div class="alert-success">
        🎉 A patient has successfully checked in at your clinic!
      </div>

      <div class="section-title">👤 Patient Information</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Full Name:</span>
          <span class="info-value">${checkInData.firstName} ${checkInData.lastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📧 Email:</span>
          <span class="info-value">${checkInData.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📱 Phone:</span>
          <span class="info-value">${checkInData.phone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">🎂 Date of Birth:</span>
          <span class="info-value">${checkInData.dateOfBirth || 'Not provided'}</span>
        </div>
      </div>

      <div class="section-title">🏠 Address</div>
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

      <div class="section-title">💳 Insurance Information</div>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">Insurance Card ID:</span>
          <span class="info-value">${checkInData.insuranceCardId || 'Not provided'}</span>
        </div>
      </div>

      <div class="documents-section">
        <strong>📎 Attached Documents:</strong>
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
          <span class="info-label">⏰ Check-In Time:</span>
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
      <p>📞 (630) 234-4466 | 📍 Oak Brook, IL • Munster, IN • Winfield, IL</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
  `;
}