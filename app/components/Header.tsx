'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(to right, #2563eb, #9333ea)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
        <Image 
          src="/logo-decare.svg" 
          alt="DECARE Logo" 
          width={50} 
          height={50} 
        />
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            DECARE
          </h1>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#e0e7ff' }}>
            Endocrinology Care
          </p>
        </div>
      </Link>
    </header>
  );
}