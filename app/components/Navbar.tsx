'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-glass">
      <div className="container">
        <Link href="/" className="navbar-brand gradient-text fw-bold fs-4">
          Dr. Sana Meah, DO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link href="#home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="#about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link href="#services" className="nav-link">Services</Link>
            </li>
            <li className="nav-item">
              <Link href="#appointment" className="nav-link">Appointment</Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link href="#appointment" className="btn btn-gradient rounded-pill px-4">
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}