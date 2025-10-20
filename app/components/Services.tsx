'use client';

import { Service } from '../../types';

const services: Service[] = [
  {
    id: 1,
    title: 'Diabetes Management',
    description: 'Comprehensive care for Type 1, Type 2, and Gestational Diabetes with personalized treatment plans.',
    icon: 'bi-activity',
    gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    iconGradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    durationColor: ''
  },
  {
    id: 2,
    title: 'Thyroid Disorders',
    description: 'Expert diagnosis and treatment of hypothyroidism, hyperthyroidism, and thyroid nodules.',
    icon: 'bi-capsule',
    gradient: 'linear-gradient(135deg, #ddd6fe, #c4b5fd)',
    iconGradient: 'linear-gradient(135deg, #a855f7, #9333ea)',
    durationColor: ''
  },
  {
    id: 3,
    title: 'Hormonal Disorders',
    description: 'Treatment for pituitary, parathyroid, PCOS, adrenal and hypogonadism disorders.',
    icon: 'bi-heart-pulse-fill',
    gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    iconGradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    durationColor: ''
  },
  {
    id: 4,
    title: 'Weight Management',
    description: 'Evidence-based obesity treatment with lifestyle modification and medical management.',
    icon: 'bi-clipboard2-pulse',
    gradient: 'linear-gradient(135deg, #dcfce7, #d1fae5)',
    iconGradient: 'linear-gradient(135deg, #10b981, #059669)',
    durationColor: ''
  },
  {
    id: 5,
    title: 'Osteoporosis Care',
    description: 'Prevention and treatment of bone health disorders with comprehensive monitoring.',
    icon: 'bi-heart',
    gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    iconGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    durationColor: ''
  },
  {
    id: 6,
    title: 'Internal Medicine',
    description: 'Comprehensive primary care including hypertension and hyperlipidemia management.',
    icon: 'bi-bandaid',
    gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    iconGradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    durationColor: ''
  }
];

export default function Services() {
  return (
    <section id="services" className="py-5">
      <div className="container py-5">
        <h2 className="display-3 fw-bold text-center gradient-text mb-3">Specialized Services</h2>
        <p className="text-center text-muted mb-5 fs-5">Expert endocrinology and internal medicine care</p>
        
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card service-card card-3d h-100 shadow-lg" style={{ background: service.gradient }}>
                <div className="card-body p-4">
                  <div className="service-icon mb-4" style={{ background: service.iconGradient }}>
                    <i className={service.icon}></i>
                  </div>
                  <h4 className="fw-bold mb-3">{service.title}</h4>
                  <p className="text-muted mb-3">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}