'use client'

import React, { useState } from 'react';
import { Camera, CheckCircle, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface PhotoData {
  file: File;
  url: string;
}

export default function CheckInPage() {
  const [patientType, setPatientType] = useState<'new' | 'returning' | null>(null);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  });
  
  const [insuranceCardFront, setInsuranceCardFront] = useState<PhotoData | null>(null);
  const [insuranceCardBack, setInsuranceCardBack] = useState<PhotoData | null>(null);
  const [idFront, setIdFront] = useState<PhotoData | null>(null);
  const [idBack, setIdBack] = useState<PhotoData | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<{file: File, url: string, id: number}[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const startCamera = async (type: string) => {
    setCameraType(type);
    setShowCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access denied. Please allow camera access to scan documents.');
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${cameraType}-${Date.now()}.jpg`, { type: 'image/jpeg' });
            const photoUrl = URL.createObjectURL(blob);
            
            switch(cameraType) {
              case 'insurance-front':
                setInsuranceCardFront({ file, url: photoUrl });
                break;
              case 'insurance-back':
                setInsuranceCardBack({ file, url: photoUrl });
                break;
              case 'id-front':
                setIdFront({ file, url: photoUrl });
                break;
              case 'id-back':
                setIdBack({ file, url: photoUrl });
                break;
              case 'additional':
                setAdditionalDocs(prev => [...prev, { file, url: photoUrl, id: Date.now() }]);
                break;
            }
            
            stopCamera();
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setCameraType('');
  };

  const removeAdditionalDoc = (id: number) => {
    setAdditionalDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const handleNewPatientSubmit = async () => {
    if (!formData.email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      formDataToSend.append('address', '');
      formDataToSend.append('city', '');
      formDataToSend.append('state', '');
      formDataToSend.append('zipCode', '');
      formDataToSend.append('insuranceCardId', '');
      
      if (insuranceCardFront) formDataToSend.append('insuranceFront', insuranceCardFront.file);
      if (insuranceCardBack) formDataToSend.append('insuranceBack', insuranceCardBack.file);
      if (idFront) formDataToSend.append('idFront', idFront.file);
      if (idBack) formDataToSend.append('idBack', idBack.file);
      
      additionalDocs.forEach((doc, index) => {
        formDataToSend.append(`additionalDoc${index}`, doc.file);
      });

      const response = await fetch('/api/check-in', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        try {
          await fetch('/api/send-new-patient-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email })
          });
          console.log('Intake email sent successfully');
        } catch (emailError) {
          console.error('Email sending failed but check-in succeeded:', emailError);
        }
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Failed to complete check-in: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting check-in:', error);
      alert('Error submitting check-in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturningPatientSubmit = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('dateOfBirth', '');
      formDataToSend.append('address', '');
      formDataToSend.append('city', '');
      formDataToSend.append('state', '');
      formDataToSend.append('zipCode', '');
      formDataToSend.append('insuranceCardId', '');
      
      if (insuranceCardFront) formDataToSend.append('insuranceFront', insuranceCardFront.file);
      if (insuranceCardBack) formDataToSend.append('insuranceBack', insuranceCardBack.file);
      if (idFront) formDataToSend.append('idFront', idFront.file);
      if (idBack) formDataToSend.append('idBack', idBack.file);
      
      additionalDocs.forEach((doc, index) => {
        formDataToSend.append(`additionalDoc${index}`, doc.file);
      });

      const response = await fetch('/api/check-in', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Failed to complete check-in: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting check-in:', error);
      alert('Error submitting check-in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPatientType(null);
    setStep(1);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '' });
    setInsuranceCardFront(null);
    setInsuranceCardBack(null);
    setIdFront(null);
    setIdBack(null);
    setAdditionalDocs([]);
    setSubmitted(false);
  };

  const allRequiredDocsScanned = insuranceCardFront && insuranceCardBack && idFront && idBack;

  if (patientType === null) {
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
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Welcome
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '3rem' }}>
            Are you a new or returning patient?
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <button
              onClick={() => setPatientType('new')}
              style={{
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                color: 'white',
                padding: '2rem 1.5rem',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              New Patient
            </button>
            
            <button
              onClick={() => setPatientType('returning')}
              style={{
                background: '#6b7280',
                color: 'white',
                padding: '2rem 1.5rem',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Returning Patient
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Check-In Complete!
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '1rem' }}>
            Thank you for checking in. The doctor will be notified of your arrival.
          </p>
          {patientType === 'new' && (
            <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem', background: '#f0f9ff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe' }}>
              We've also sent you an email with a link to complete your detailed patient intake form. Please complete it at your earliest convenience.
            </p>
          )}
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
            Please have a seat in the waiting room. We'll call you shortly.
          </p>
          <button
            onClick={resetForm}
            style={{
              background: 'linear-gradient(to right, #2563eb, #9333ea)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            New Check-In
          </button>
        </div>
      </div>
    );
  }

  if (showCamera) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#111827' }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
            {cameraType === 'insurance-front' && 'Scan Insurance Card - FRONT'}
            {cameraType === 'insurance-back' && 'Scan Insurance Card - BACK'}
            {cameraType === 'id-front' && 'Scan ID - FRONT'}
            {cameraType === 'id-back' && 'Scan ID - BACK'}
            {cameraType === 'additional' && 'Scan Additional Document'}
          </h2>
          <button onClick={stopCamera} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X style={{ width: '2rem', height: '2rem' }} />
          </button>
        </div>
        
        <div style={{ flex: 1, position: 'relative' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        
        <div style={{ padding: '1.5rem', background: '#111827', textAlign: 'center' }}>
          <button
            onClick={capturePhoto}
            style={{
              background: 'white',
              color: '#111827',
              padding: '1rem 3rem',
              borderRadius: '9999px',
              fontSize: '1.25rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Capture Photo
          </button>
        </div>
      </div>
    );
  }

  const DocumentCaptureBox = ({ 
    photo, 
    onCapture, 
    onRemove, 
    label,
    required = true
  }: { 
    photo: PhotoData | null; 
    onCapture: () => void; 
    onRemove: () => void; 
    label: string;
    required?: boolean;
  }) => (
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </h3>
      {photo ? (
        <div style={{ position: 'relative' }}>
          <img 
            src={photo.url} 
            alt={label} 
            style={{ width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.75rem', border: '2px solid #d1d5db' }} 
          />
          <button
            onClick={onRemove}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: '#ef4444',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
      ) : (
        <div
          onClick={onCapture}
          style={{
            width: '100%',
            border: '4px dashed #d1d5db',
            borderRadius: '0.75rem',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'white',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c084fc';
            e.currentTarget.style.background = '#faf5ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.background = 'white';
          }}
        >
          <Camera style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '1rem', fontWeight: '600', color: '#4b5563' }}>Tap to Scan</p>
        </div>
      )}
    </div>
  );

  if (patientType === 'new' && step === 1) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #f3e8ff)', padding: '1rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                New Patient Check-In
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>Diabetes & Endocrinology Care Clinic</p>
              <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: '1rem' }}>Step 1 of 2: Personal Information</p>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="John" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="Doe" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Date of Birth *</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="john@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="(630) 234-4466" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
              <button onClick={() => setPatientType(null)} style={{ background: '#e5e7eb', color: '#374151', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                Back
              </button>
              <button onClick={() => setStep(2)} disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.dateOfBirth} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth ? 'linear-gradient(to right, #2563eb, #9333ea)' : '#d1d5db', color: 'white', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth ? 'pointer' : 'not-allowed', marginLeft: 'auto' }}>
                <span>Next</span>
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (patientType === 'new' && step === 2) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #f3e8ff)', padding: '1rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                New Patient Check-In
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>Diabetes & Endocrinology Care Clinic</p>
              <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: '1rem' }}>Step 2 of 2: Scan Documents</p>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Scan Documents</h2>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Insurance Card</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <DocumentCaptureBox photo={insuranceCardFront} onCapture={() => startCamera('insurance-front')} onRemove={() => setInsuranceCardFront(null)} label="Front Side" required={false} />
                <DocumentCaptureBox photo={insuranceCardBack} onCapture={() => startCamera('insurance-back')} onRemove={() => setInsuranceCardBack(null)} label="Back Side" required={false} />
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Photo ID</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <DocumentCaptureBox photo={idFront} onCapture={() => startCamera('id-front')} onRemove={() => setIdFront(null)} label="Front Side" required={true} />
                <DocumentCaptureBox photo={idBack} onCapture={() => startCamera('id-back')} onRemove={() => setIdBack(null)} label="Back Side" required={true} />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Additional Documents (Optional)</h3>
              {additionalDocs.map((doc) => (
                <div key={doc.id} style={{ position: 'relative', marginBottom: '1rem' }}>
                  <img src={doc.url} alt="Document" style={{ width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.75rem', border: '2px solid #d1d5db' }} />
                  <button onClick={() => removeAdditionalDoc(doc.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#ef4444', color: 'white', padding: '0.5rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                    <X style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
              ))}
              <div onClick={() => startCamera('additional')} style={{ width: '100%', border: '4px dashed #d1d5db', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', background: 'white' }}>
                <Camera style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>Scan Additional Document</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
              <button onClick={() => setStep(1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e5e7eb', color: '#374151', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Back</span>
              </button>
              <button onClick={handleNewPatientSubmit} disabled={!allRequiredDocsScanned || isLoading} style={{ background: allRequiredDocsScanned ? 'linear-gradient(to right, #059669, #2563eb)' : '#d1d5db', color: allRequiredDocsScanned ? 'white' : '#6b7280', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: allRequiredDocsScanned ? 'pointer' : 'not-allowed', marginLeft: 'auto' }}>
                {isLoading ? 'Submitting...' : 'Complete Check-In'}
              </button>
            </div>
          </div>
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
              Returning Patient Check-In
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>Diabetes & Endocrinology Care Clinic</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Patient Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="John" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="Doe" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="john@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', border: '2px solid #d1d5db', borderRadius: '0.75rem' }} placeholder="(630) 234-4466" />
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Scan Documents</h2>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Insurance Card</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <DocumentCaptureBox photo={insuranceCardFront} onCapture={() => startCamera('insurance-front')} onRemove={() => setInsuranceCardFront(null)} label="Front Side" required={false} />
                <DocumentCaptureBox photo={insuranceCardBack} onCapture={() => startCamera('insurance-back')} onRemove={() => setInsuranceCardBack(null)} label="Back Side" required={false} />
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Photo ID</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <DocumentCaptureBox photo={idFront} onCapture={() => startCamera('id-front')} onRemove={() => setIdFront(null)} label="Front Side" required={true} />
                <DocumentCaptureBox photo={idBack} onCapture={() => startCamera('id-back')} onRemove={() => setIdBack(null)} label="Back Side" required={true} />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Additional Documents (Optional)</h3>
              {additionalDocs.map((doc) => (
                <div key={doc.id} style={{ position: 'relative', marginBottom: '1rem' }}>
                  <img src={doc.url} alt="Document" style={{ width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.75rem', border: '2px solid #d1d5db' }} />
                  <button onClick={() => removeAdditionalDoc(doc.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#ef4444', color: 'white', padding: '0.5rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
                    <X style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
              ))}
              <div onClick={() => startCamera('additional')} style={{ width: '100%', border: '4px dashed #d1d5db', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', cursor: 'pointer', background: 'white' }}>
                <Camera style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>Scan Additional Document</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
            <button onClick={() => setPatientType(null)} style={{ background: '#e5e7eb', color: '#374151', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
              Back
            </button>
            <button onClick={handleReturningPatientSubmit} disabled={!allRequiredDocsScanned || isLoading} style={{ background: allRequiredDocsScanned ? 'linear-gradient(to right, #059669, #2563eb)' : '#d1d5db', color: allRequiredDocsScanned ? 'white' : '#6b7280', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', fontWeight: '600', border: 'none', cursor: allRequiredDocsScanned ? 'pointer' : 'not-allowed', marginLeft: 'auto' }}>
              {isLoading ? 'Submitting...' : 'Complete Check-In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}