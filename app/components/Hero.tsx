'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="hero-section gradient-animated text-white">
      <div className="hero-orb-1 floating"></div>
      <div className="hero-orb-2 floating"></div>
      
      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="display-2 fw-bold mb-3">Dr. Sana Meah, DO</h1>
            <p className="fs-4 mb-2">Board Certified Endocrinologist</p>
            <p className="fs-5 mb-3 opacity-75">
              Specializing in Diabetes, Endocrine Disorders & Internal Medicine
            </p>
            <div className="mb-4">
              <span className="badge bg-light text-dark px-3 py-2 me-2 mb-2">
                <i className="bi bi-translate me-2"></i>English
              </span>
              <span className="badge bg-light text-dark px-3 py-2 me-2 mb-2">
                <i className="bi bi-translate me-2"></i>Urdu
              </span>
              <span className="badge bg-light text-dark px-3 py-2 me-2 mb-2">
                <i className="bi bi-translate me-2"></i>Gujarati
              </span>
              <span className="badge bg-light text-dark px-3 py-2 me-2 mb-2">
                <i className="bi bi-translate me-2"></i>Burmese
              </span>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <Link href="#appointment" className="btn btn-light btn-lg rounded-pill px-4">
                <i className="bi bi-calendar-check me-2"></i>Schedule Appointment
              </Link>
              <Link href="#about" className="btn btn-outline-gradient btn-lg rounded-pill px-4">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="col-lg-6">
  <div className="position-relative floating">
    {/* Doctor Image Container with 3D effect */}
    <div className="doctor-image-container card-3d shadow-lg position-relative">
      <Image
        src="/images/sanameah.jpg"
        alt="Dr. Sana Meah"
        width={500}
        height={500}
        className="doctor-image"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        priority
      />
      
      {/* Experience Badge */}
      <div className="position-absolute bottom-0 end-0 m-4">
        <div className="bg-white rounded-4 p-4 shadow-lg text-center">
          <h2 className="display-4 fw-bold gradient-text mb-0">9+</h2>
          <p className="text-primary fw-semibold mb-0">Years Experience</p>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}