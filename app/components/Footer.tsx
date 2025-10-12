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
              <i className="bi bi-geo-alt me-2"></i>Oak Brook, IL
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-telephone me-2"></i>(630) 234-4466
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-camera-video me-2"></i>Telehealth Available
            </p>
          </div>
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Office Hours</h5>
            <p className="text-white-50 mb-2">Monday: 1:00 PM - 5:00 PM</p>
            <p className="text-white-50 mb-2">Tuesday: 1:00 PM - 5:00 PM</p>
            <p className="text-white-50 mb-2">Friday: 1:00 PM - 5:00 PM</p>
            <p className="text-white-50">Wed, Thu, Sat, Sun: Closed</p>
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