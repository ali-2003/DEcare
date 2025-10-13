'use client'

import { useState, FormEvent } from 'react'

interface PatientFormData {
  patientName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
}

export default function Appointment() {
  const [formData, setFormData] = useState<PatientFormData>({
    patientName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Check if form is valid (required fields filled)
  const checkFormValid = (data: PatientFormData) => {
    return !!(data.patientName && data.email && data.phone)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(updatedData)
    setIsFormValid(checkFormValid(updatedData))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccess(true)
        // Don't reset form - keep data so button stays enabled
      }
    } catch (error) {
      console.error('Error saving patient info:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScheduleClick = () => {
    // Open Practice Fusion in new tab
    window.open('https://www.patientfusion.com/doctor/sana-meah-do-23637', '_blank')
  }

  return (
    <section id="appointment" className="py-5 bg-light">
      <div className="container py-5">
        <h2 className="display-3 fw-bold text-center gradient-text mb-3">Schedule an Appointment</h2>
        <p className="text-center text-muted mb-2 fs-5">Fill in your information to proceed with scheduling</p>
        <p className="text-center mb-5">
          <i className="bi bi-telephone-fill text-primary me-2"></i>
          <strong>(630) 866-6334</strong>
          <span className="mx-3">|</span>
          <i className="bi bi-geo-alt-fill text-primary me-2"></i>4121 Fairview Ave # L2, Downers Grove, IL 60515
        </p>
        
        {/* Office Hours */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg card-3d">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4 gradient-text text-center">
                  <i className="bi bi-clock me-2"></i>Office Hours
                </h4>
                <div className="row text-center g-3 justify-content-center">
                  <div className="col-6 col-md-4">
                    <div className="p-3 bg-light rounded">
                      <strong>Monday</strong>
                      <p className="mb-0 text-muted small">8:30 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="p-3 bg-light rounded">
                      <strong>Thursday</strong>
                      <p className="mb-0 text-muted small">8:30 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="p-3 bg-light rounded">
                      <strong>Friday</strong>
                      <p className="mb-0 text-muted small">8:30 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="p-3 bg-light rounded">
                      <strong>Saturday</strong>
                      <p className="mb-0 text-muted small">9:00 PM - 12:00 PM</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="text-muted mb-0"><em>Tuesday, Wednesday and Sunday: Closed</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="card border-0 shadow-lg mb-4 card-3d form-section">
                <div className="card-body p-5">
                  <h4 className="fw-bold mb-4 gradient-text d-flex align-items-center">
                    <div className="service-icon me-3" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', width: '50px', height: '50px', fontSize: '1.5rem' }}>
                      <i className="bi bi-person"></i>
                    </div>
                    Your Information
                  </h4>
                  
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="patientName"
                        className="form-control form-control-lg"
                        required
                        value={formData.patientName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control form-control-lg"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        className="form-control form-control-lg"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control form-control-lg"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="btn btn-gradient btn-lg w-100 rounded-pill py-3 fs-5 fw-bold mt-4"
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    {isSubmitting ? 'Saving...' : 'Save My Information'}
                  </button>

                  {showSuccess && (
                    <div className="alert alert-success mt-3 mb-0 rounded-4 text-center">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Information saved! You can now schedule your appointment.
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule Appointment Button - Only enabled after saving info */}
              <div className="card border-0 shadow-lg card-3d" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                <div className="card-body p-5 text-white text-center">
                  <h4 className="fw-bold mb-3">Ready to Schedule?</h4>
                  <p className="mb-4">Click below to choose your preferred appointment time</p>
                  <button
                    type="button"
                    onClick={handleScheduleClick}
                    disabled={!showSuccess}
                    className="btn btn-light btn-lg rounded-pill px-5 py-3 fs-5 fw-bold"
                    style={{ opacity: showSuccess ? 1 : 0.5, cursor: showSuccess ? 'pointer' : 'not-allowed' }}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Schedule Appointment on Practice Fusion
                  </button>
                  {!showSuccess && (
                    <p className="mt-3 mb-0 small">
                      <i className="bi bi-info-circle me-2"></i>
                      Please save your information first
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}