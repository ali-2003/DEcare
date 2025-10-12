'use client';

export default function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container py-5">
        <h2 className="display-3 fw-bold text-center gradient-text mb-5">About Dr. Meah</h2>
        
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-lg card-3d">
              <div className="card-body p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="service-icon me-3" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                    <i className="bi bi-heart-pulse"></i>
                  </div>
                  <h3 className="gradient-text mb-0">Care Philosophy</h3>
                </div>
                <p className="text-muted mb-3">
                  Dr. Meah strongly believes in providing comprehensive, personalized care for diabetes and endocrine disorders utilizing evidence-based treatment modalities and incorporating healthy lifestyle into patient care plans.
                </p>
                <p className="text-muted">
                  Dedicated to health education and improving awareness of preventative care for chronic diseases, Dr. Meah has given grand rounds lectures at multiple hospitals and health fairs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-lg card-3d mb-4 shine">
              <div className="card-body p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="service-icon me-3" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                    <i className="bi bi-clipboard2-pulse"></i>
                  </div>
                  <h3 className="gradient-text mb-0">Clinical Interests</h3>
                </div>
                <div className="row g-2">
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-0">
                      {['Diabetes', 'Gestational Diabetes', 'Thyroid Disorders', 'Parathyroid Disorders'].map((item, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-center">
                          <span className="badge bg-primary rounded-circle me-2" style={{ width: '8px', height: '8px' }}></span>
                          <span className="small">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled mb-0">
                      {['Pituitary Disorders', 'Adrenal Disorders', 'Osteoporosis', 'Weight Management'].map((item, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-center">
                          <span className="badge bg-primary rounded-circle me-2" style={{ width: '8px', height: '8px' }}></span>
                          <span className="small">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-lg card-3d" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
              <div className="card-body p-5 text-white">
                <div className="d-flex align-items-center mb-4">
                  <div className="service-icon me-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <i className="bi bi-mortarboard"></i>
                  </div>
                  <h3 className="mb-0">Education & Training</h3>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Chicago College of Osteopathic Medicine at Midwestern University (2006)
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Fellowship: University of Arizona College of Medicine - Endocrinology (2014-2016)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-lg card-3d">
              <div className="card-body p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="service-icon me-3" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <i className="bi bi-award"></i>
                  </div>
                  <h3 className="gradient-text mb-0">Board Certifications</h3>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3 d-flex align-items-start">
                    <span className="badge bg-success rounded-circle me-3 mt-1" style={{ width: '10px', height: '10px' }}></span>
                    <span>American Osteopathic Board of Internal Medicine</span>
                  </li>
                  <li className="d-flex align-items-start">
                    <span className="badge bg-success rounded-circle me-3 mt-1" style={{ width: '10px', height: '10px' }}></span>
                    <span>American Osteopathic Board of Internal Medicine - Endocrinology, Diabetes & Metabolism</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}