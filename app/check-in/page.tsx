'use client'

import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface PhotoData {
  file: File;
  url: string;
}

export default function CheckInPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    insuranceCardId: '',
  });
  
  const [insuranceCardFront, setInsuranceCardFront] = useState<PhotoData | null>(null);
  const [insuranceCardBack, setInsuranceCardBack] = useState<PhotoData | null>(null);
  const [idFront, setIdFront] = useState<PhotoData | null>(null);
  const [idBack, setIdBack] = useState<PhotoData | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<{file: File, url: string, id: number}[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

  const handleSubmit = async () => {
    console.log('Form Data:', formData);
    console.log('Insurance Card Front:', insuranceCardFront);
    console.log('Insurance Card Back:', insuranceCardBack);
    console.log('ID Front:', idFront);
    console.log('ID Back:', idBack);
    console.log('Additional Documents:', additionalDocs);
    
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      insuranceCardId: '',
    });
    setInsuranceCardFront(null);
    setInsuranceCardBack(null);
    setIdFront(null);
    setIdBack(null);
    setAdditionalDocs([]);
    setSubmitted(false);
  };

  const allRequiredDocsScanned = insuranceCardFront && insuranceCardBack && idFront && idBack;

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
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem' }}>
            Thank you for checking in. The doctor will be notified of your arrival.
          </p>
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
              fontSize: '1.25rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            New Patient Check-In
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
    label 
  }: { 
    photo: PhotoData | null; 
    onCapture: () => void; 
    onRemove: () => void; 
    label: string;
  }) => (
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
        {label} <span style={{ color: '#ef4444' }}>*</span>
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #f3e8ff)', padding: '1rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Diabetes & Endocrinology Care Clinic
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>Patient Check-In</p>
          </div>
          
          {/* Progress Steps */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem', alignItems: 'center' }}>
            {[1, 2, 3].map((num) => (
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
                {num < 3 && <div style={{ width: '4rem', height: '4px', background: step > num ? '#9333ea' : '#e5e7eb' }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Personal Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                    placeholder="Doe"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                    placeholder="(630) 234-4466"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Address Information</h2>
              
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                      placeholder="Oak Brook"
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                      placeholder="IL"
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                      placeholder="60523"
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Insurance Card ID</label>
                  <input
                    type="text"
                    name="insuranceCardId"
                    value={formData.insuranceCardId}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1.125rem', border: '2px solid #d1d5db', borderRadius: '0.75rem', outline: 'none' }}
                    placeholder="ABC123456789"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Scan Documents</h2>
              
              {/* Insurance Card */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  Insurance Card
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <DocumentCaptureBox
                    photo={insuranceCardFront}
                    onCapture={() => startCamera('insurance-front')}
                    onRemove={() => setInsuranceCardFront(null)}
                    label="Front Side"
                  />
                  <DocumentCaptureBox
                    photo={insuranceCardBack}
                    onCapture={() => startCamera('insurance-back')}
                    onRemove={() => setInsuranceCardBack(null)}
                    label="Back Side"
                  />
                </div>
              </div>

              {/* ID Card */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  Photo ID (Driver's License or State ID)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <DocumentCaptureBox
                    photo={idFront}
                    onCapture={() => startCamera('id-front')}
                    onRemove={() => setIdFront(null)}
                    label="Front Side"
                  />
                  <DocumentCaptureBox
                    photo={idBack}
                    onCapture={() => startCamera('id-back')}
                    onRemove={() => setIdBack(null)}
                    label="Back Side"
                  />
                </div>
              </div>

              {/* Additional Documents */}
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                  Additional Documents (Optional)
                </h3>
                
                {additionalDocs.map((doc) => (
                  <div key={doc.id} style={{ position: 'relative', marginBottom: '1rem' }}>
                    <img src={doc.url} alt="Document" style={{ width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.75rem', border: '2px solid #d1d5db' }} />
                    <button
                      onClick={() => removeAdditionalDoc(doc.id)}
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
                ))}
                
                <div
                  onClick={() => startCamera('additional')}
                  style={{
                    width: '100%',
                    border: '4px dashed #d1d5db',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <Upload style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>Scan Additional Document</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#e5e7eb',
                  color: '#374151',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Back</span>
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(to right, #2563eb, #9333ea)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                <span>Next</span>
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allRequiredDocsScanned}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: allRequiredDocsScanned ? 'linear-gradient(to right, #059669, #2563eb)' : '#d1d5db',
                  color: allRequiredDocsScanned ? 'white' : '#6b7280',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: allRequiredDocsScanned ? 'pointer' : 'not-allowed',
                  marginLeft: 'auto'
                }}
              >
                <span>Complete Check-In</span>
                <CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}