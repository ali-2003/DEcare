'use client'

import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Upload } from 'lucide-react';

interface IntakeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  diabetesType: string;
  diagnosisYear: string;
  currentTreatment: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  reasonForVisit: string;
  additionalNotes: string;
}

interface FileData {
  file: File;
  url: string;
}

export default function PatientIntakePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IntakeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    diabetesType: 'type1',
    diagnosisYear: '',
    currentTreatment: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    reasonForVisit: '',
    additionalNotes: '',
  });

  const [medicalRecords, setMedicalRecords] = useState<FileData | null>(null);
  const [laboratoryResults, setLaboratoryResults] = useState<FileData | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<FileData | null>(null);
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<FileData | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile({ file, url });
    }
  };

  const getCurrentDateTime = () => {
    return new Date().toLocaleString('en-US', { 
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'short'
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof IntakeFormData]);
      });
      
      // Add consent information
      formDataToSend.append('consentAgreed', consentAgreed.toString());
      formDataToSend.append('consentDate', getCurrentDateTime());
      
      if (medicalRecords) formDataToSend.append('medicalRecords', medicalRecords.file);
      if (laboratoryResults) formDataToSend.append('laboratoryResults', laboratoryResults.file);
      if (otherDocuments) formDataToSend.append('otherDocuments', otherDocuments.file);

      const response = await fetch('/api/patient-intake', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit intake form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting intake form:', error);
      alert('Error submitting intake form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #dbeafe, #f3e8ff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '3rem',
          maxWidth: '42rem',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <CheckCircle style={{ width: '6rem', height: '6rem', color: '#10b981', margin: '0 auto' }} />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Intake Form Submitted!
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem' }}>
            Thank you for completing your intake form. We will review your information and contact you shortly to schedule your appointment.
          </p>
          <a href="/" style={{
            display: 'inline-block',
            background: 'linear-gradient(to right, #2563eb, #9333ea)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #f3e8ff)', padding: '1rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Patient Intake Form
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>Diabetes & Endocrinology Care Clinic</p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  background: step >= num ? 'linear-gradient(to right, #2563eb, #9333ea)' : '#e5e7eb',
                  color: step >= num ? 'white' : '#9ca3af'
                }}>
                  {num}
                </div>
                {num < 5 && <div style={{ width: '3rem', height: '4px', background: step > num ? '#9333ea' : '#e5e7eb' }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Address Information</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Street Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>ZIP Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Insurance Provider</label>
                  <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleInputChange} placeholder="e.g., Blue Cross Blue Shield" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Insurance Policy Number</label>
                  <input type="text" name="insurancePolicyNumber" value={formData.insurancePolicyNumber} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Medical History</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Diabetes Type *</label>
                  <select name="diabetesType" value={formData.diabetesType} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }}>
                    <option value="type1">Type 1 Diabetes</option>
                    <option value="type2">Type 2 Diabetes</option>
                    <option value="gestational">Gestational Diabetes</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Year of Diagnosis *</label>
                  <input type="number" name="diagnosisYear" value={formData.diagnosisYear} onChange={handleInputChange} placeholder="2020" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Current Diabetes Treatment *</label>
                  <textarea name="currentTreatment" value={formData.currentTreatment} onChange={handleInputChange} placeholder="e.g., Insulin injections, Metformin, etc." style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Other Medical Conditions</label>
                  <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleInputChange} placeholder="List any other medical conditions..." style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Current Medications</label>
                  <textarea name="currentMedications" value={formData.currentMedications} onChange={handleInputChange} placeholder="List all medications you are currently taking..." style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Allergies</label>
                  <textarea name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="List any allergies (medications, food, etc.)..." style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Emergency Contact & Visit Details</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Emergency Contact</h3>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Contact Name *</label>
                  <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone Number *</label>
                  <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Relationship *</label>
                  <input type="text" name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleInputChange} placeholder="e.g., Spouse, Parent, Sibling" required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Visit Details</h3>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Reason for Visit</label>
                  <textarea name="reasonForVisit" value={formData.reasonForVisit} onChange={handleInputChange} placeholder="What brings you in today?" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Additional Notes</label>
                  <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} placeholder="Any additional information we should know?" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', minHeight: '100px', fontFamily: 'inherit' }} />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Upload Documents (Optional)</h3>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Medical Records</label>
                  <label style={{ display: 'block', padding: '2rem', border: '2px dashed #d1d5db', borderRadius: '0.75rem', textAlign: 'center', cursor: 'pointer' }}>
                    <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                    <span style={{ color: '#4b5563' }}>Click to upload</span>
                    <input type="file" onChange={(e) => handleFileChange(e, setMedicalRecords)} style={{ display: 'none' }} accept=".pdf,.doc,.docx" />
                  </label>
                  {medicalRecords && <p style={{ color: '#10b981', marginTop: '0.5rem' }}>✓ {medicalRecords.file.name}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Laboratory Results</label>
                  <label style={{ display: 'block', padding: '2rem', border: '2px dashed #d1d5db', borderRadius: '0.75rem', textAlign: 'center', cursor: 'pointer' }}>
                    <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                    <span style={{ color: '#4b5563' }}>Click to upload</span>
                    <input type="file" onChange={(e) => handleFileChange(e, setLaboratoryResults)} style={{ display: 'none' }} accept=".pdf,.doc,.docx" />
                  </label>
                  {laboratoryResults && <p style={{ color: '#10b981', marginTop: '0.5rem' }}>✓ {laboratoryResults.file.name}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Other Documents</label>
                  <label style={{ display: 'block', padding: '2rem', border: '2px dashed #d1d5db', borderRadius: '0.75rem', textAlign: 'center', cursor: 'pointer' }}>
                    <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                    <span style={{ color: '#4b5563' }}>Click to upload</span>
                    <input type="file" onChange={(e) => handleFileChange(e, setOtherDocuments)} style={{ display: 'none' }} accept=".pdf,.doc,.docx" />
                  </label>
                  {otherDocuments && <p style={{ color: '#10b981', marginTop: '0.5rem' }}>✓ {otherDocuments.file.name}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Patient Consent Form</h2>
              
              <div style={{ background: '#f0f9ff', border: '2px solid #2563eb', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>Acknowledgment and Consent</h3>
                
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem', lineHeight: '1.8', color: '#4b5563', fontSize: '0.95rem' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    I hereby acknowledge that I have provided truthful and complete information in this patient intake form for Diabetes & Endocrinology Care Clinic. I understand that:
                  </p>
                  
                  <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>The information provided will be used to facilitate my medical care and treatment</li>
                    <li style={{ marginBottom: '0.5rem' }}>My medical records will be kept confidential in accordance with HIPAA regulations</li>
                    <li style={{ marginBottom: '0.5rem' }}>I have disclosed all relevant medical history, medications, and allergies</li>
                    <li style={{ marginBottom: '0.5rem' }}>I will notify the clinic of any changes to my medical information</li>
                    <li style={{ marginBottom: '0.5rem' }}>The physician may contact me using the provided contact information for medical purposes</li>
                  </ul>

                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Patient Signature (Digital):</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Date and Time:</strong> {getCurrentDateTime()}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: '#f3e8ff', borderRadius: '0.75rem', border: '1px solid #d8b4fe' }}>
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                  />
                  <label htmlFor="consent" style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', cursor: 'pointer', margin: 0 }}>
                    I acknowledge that I have read and agree to this patient intake form and consent form
                  </label>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e5e7eb', color: '#374151', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}>
                <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Back</span>
              </button>
            )}
            
            {step < 5 ? (
              <button onClick={() => setStep(step + 1)} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(to right, #2563eb, #9333ea)', color: 'white', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', marginLeft: 'auto', opacity: isLoading ? 0.6 : 1 }}>
                <span>Next</span>
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={isLoading || !consentAgreed || !formData.firstName || !formData.lastName || !formData.email} style={{ background: isLoading || !consentAgreed ? '#d1d5db' : 'linear-gradient(to right, #059669, #2563eb)', color: isLoading || !consentAgreed ? '#6b7280' : 'white', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: isLoading || !consentAgreed ? 'not-allowed' : 'pointer', marginLeft: 'auto' }}>
                {isLoading ? 'Submitting...' : 'Submit Intake Form'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}