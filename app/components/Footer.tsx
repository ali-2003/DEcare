export default function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container position-relative py-4" style={{ zIndex: 10 }}>
        <div className="row g-4">
          <div className="col-lg-4">
            <h4 className="fw-bold mb-3">Dr. Sana Meah, DO</h4>
            <p className="text-white-50">
              Board Certified Endocrinologist providing evidence-based, personalized care for diabetes and endocrine disorders.
            </p>
          </div>
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Contact Info</h5>
            <p className="text-white-50 mb-2">
              <i className="bi bi-geo-alt me-2"></i>4121 Fairview Ave # L2, Downers Grove, IL 60515
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-telephone me-2"></i>(630) 866-6334
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-camera-video me-2"></i>Telehealth Available
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-envelope me-2"></i>smeah@diabetesendocare.org
            </p>
          </div>
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Office Hours</h5>
            <p className="text-white-50 mb-2">Monday: 8:30 AM - 5:00 PM</p>
            <p className="text-white-50 mb-2">Thursday: 8:30 AM - 5:00 PM</p>
            <p className="text-white-50 mb-2">Friday: 8:30 AM - 5:00 PM</p>
            <p className="text-white-50 mb-2">Saturday: 9:00 AM - 12:00 PM</p>
            <p className="text-white-50">Tue, Wed, Sun: Closed</p>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <p className="text-center text-white-50 mb-0">
          &copy; 2024 Dr. Sana Meah Medical Practice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}