import { Link } from "react-router-dom";
import {
  FaCertificate,
  FaLaptopCode,
  FaUsers,
  FaMobileAlt
} from "react-icons/fa";

function Landing() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container text-center text-white">

            <h1 className="hero-main-title">
              LearnHub
            </h1>

            <h3 className="hero-sub-title">
              Your Center for Skill Enhancement
            </h3>

            <p className="hero-description mt-4">
              An Advanced Online Learning Platform (OLP) providing
              flexibility, accessibility, certification, and structured learning.
            </p>

            <Link
              to="/register"
              className="btn btn-warning btn-lg px-5 mt-4 hero-btn"
            >
              Get Started
            </Link>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold section-title">
            Why Choose LearnHub?
          </h2>

          <div className="row g-4">

            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <FaLaptopCode size={45} className="feature-icon mb-3" />
                <h5>Course Management</h5>
                <p>
                  Teachers can upload, organize, manage sections,
                  and monitor course enrollments effectively.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <FaUsers size={45} className="feature-icon mb-3" />
                <h5>Interactive Learning</h5>
                <p>
                  Students can collaborate, discuss topics,
                  and track their learning progress in real-time.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <FaCertificate size={45} className="feature-icon mb-3" />
                <h5>Certification</h5>
                <p>
                  Receive downloadable certificates upon
                  successful completion of courses.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <FaMobileAlt size={45} className="feature-icon mb-3" />
                <h5>Accessible Anywhere</h5>
                <p>
                  Learn anytime on laptop, tablet, or mobile
                  with seamless device compatibility.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="container text-center">
          <p className="mb-0">
            © 2026 LearnHub | Online Learning Platform | Full Stack MERN Project
          </p>
        </div>
      </footer>
    </>
  );
}

export default Landing;