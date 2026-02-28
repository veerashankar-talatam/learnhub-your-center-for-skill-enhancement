import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  //
  const filteredCourses = courses.filter((course) => {

  const matchesSearch =
    course.C_title.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    course.C_categories === categoryFilter;

  const matchesPrice =
    priceFilter === "All" ||
    (priceFilter === "Free" && course.C_price === 0) ||
    (priceFilter === "Paid" && course.C_price > 0);

  return matchesSearch && matchesCategory && matchesPrice;
});
//
const isNewCourse = (createdAt) => {
  const courseDate = new Date(createdAt);
  const now = new Date();
  const diffDays = (now - courseDate) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};
  
  // ================= PURCHASE =================
  const purchaseCourse = async (id) => {
  const cardholdername = prompt("Enter Card Holder Name:");
  const cardnumber = prompt("Enter Card Number (16 digits):");
  const expmonthyear = prompt("Enter Expiry (MM/YY):");

  try {
    const res = await axios.post(
      `http://localhost:5000/api/courses/purchase/${id}`,
      {
        cardholdername,
        cardnumber,
        expmonthyear,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(`Payment Successful!\nPayment ID: ${res.data?.paymentID|| "not generated"}`);
    fetchCourses();

  } catch (error) {
    alert(error.response?.data?.message || "Payment Failed");
  }
};

  // ================= DELETE =================
  const deleteCourse = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course Deleted Successfully");
      fetchCourses();
    } catch (error) {
      console.log("DELETE ERROR:",error.response?.data);
        alert(error.response?.data?.message ||"Delete Failed");    }
  };

  // ================= CERTIFICATE =================
  const downloadCertificate = (courseTitle) => {
  const certificateID =
    "LH-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const certificateWindow = window.open("", "_blank");

  certificateWindow.document.write(`
    <html>
      <head>
        <title>Certificate of Completion</title>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Georgia', serif;
            background: #f4f6f9;
          }

          .certificate {
            position: relative;
            background: white;
            padding: 60px;
            border: 20px solid;
            border-image: linear-gradient(45deg, #d4af37, #f8e48c, #d4af37) 1;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }

          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #0d6efd;
            margin-bottom: 10px;
          }

          .title {
            font-size: 48px;
            font-weight: bold;
            margin: 20px 0;
            color: #333;
          }

          .subtitle {
            font-size: 22px;
            margin-bottom: 30px;
          }

          .student-name {
            font-size: 36px;
            font-weight: bold;
            color: #198754;
            margin: 20px 0;
          }

          .course-name {
            font-size: 28px;
            font-weight: bold;
            color: #dc3545;
            margin: 20px 0;
          }

          .details {
            margin-top: 30px;
            font-size: 18px;
          }

          .certificate-id {
            margin-top: 10px;
            font-size: 14px;
            color: #555;
          }

          .signature-section {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            padding: 0 80px;
          }

          .signature {
            text-align: center;
            font-size: 18px;
          }

          .qr-section {
            margin-top: 40px;
          }

          .watermark {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 120px;
            color: rgba(0, 0, 0, 0.05);
            font-weight: bold;
            pointer-events: none;
          }

          @media print {
            body {
              background: white;
            }
          }
        </style>
      </head>

      <body>
        <div class="certificate">

          <div class="watermark">LearnHub</div>

          <div class="logo">🏆 LearnHub </div>

          <div class="title">Certificate of Completion</div>

          <div class="subtitle">
            This certificate is proudly presented to
          </div>

          <div class="student-name">
            ${user.name}
          </div>

          <div class="subtitle">
            for successfully completing the professional course
          </div>

          <div class="course-name">
            ${courseTitle}
          </div>

          <div class="details">
            Date: ${new Date().toLocaleDateString()}
          </div>

          <div class="certificate-id">
            Certificate ID: ${certificateID}
          </div>

          <div class="qr-section">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${certificateID}" 
              alt="QR Code"
            />
          </div>

          <div class="signature-section">
            <div class="signature">
              ____________________<br/>
              Director
            </div>

            <div class="signature">
              ____________________<br/>
              Instructor
            </div>
          </div>

        </div>
      </body>
    </html>
  `);

  certificateWindow.document.close();
  certificateWindow.print();
};
  // ================= UI =================
  return (
    <div
      className="container-fluid px-4 modern-bg"
      style={{ marginTop: "120px", minHeight: "100vh" }}
    >
      <h2 className="fw-bold mb-4">Explore Courses</h2>
      <div className="card shadow-sm p-4 mb-4 border-0">

  <div className="row g-3">

    {/* SEARCH */}
    <div className="col-md-4">
      <input
        type="text"
        className="form-control rounded-pill px-4"
        placeholder="🔍 Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* CATEGORY FILTER */}
    <div className="col-md-4">
      <select
        className="form-select rounded-pill"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="All">All Categories</option>
        {[...new Set(courses.map(c => c.C_categories))].map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {/* PRICE FILTER */}
    <div className="col-md-4">
      <select
        className="form-select rounded-pill"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      >
        <option value="All">All Prices</option>
        <option value="Free">Free</option>
        <option value="Paid">Paid</option>
      </select>
    </div>

  </div>

</div>

      <div className="row">
        {filteredCourses.map((course) => {
          const studentData =
            user &&
            course.enrolledStudents?.find(
              (s) => s.userId?.toString() === user._id
            );

          const isEnrolled = !!studentData;
          const progress = studentData?.progress || 0;

          return (
            <div key={course._id} className="col-12 col-sm-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0 course-card position-relative">

                <div className="card-body d-flex flex-column">

                  <h5 className="fw-bold">{course.C_title}</h5>

                  <p className="text-muted small mb-2">
                    By {course.C_educator}
                  </p>

                  <p className="small text-secondary flex-grow-1">
                    {course.C_description.substring(0, 100)}...
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge bg-primary">
                      {course.C_categories}
                    </span>

                    <span className="fw-bold text-success">
                      ₹ {course.C_price}
                    </span>
                  </div>

                  <hr />

                  {user?.type === "teacher" && (
                    <button
                      className="btn btn-danger w-100 mt-2"
                      onClick={() => deleteCourse(course._id)}
                    >
                      Delete Course
                    </button>
                  )}

                  {user?.type === "student" && isEnrolled && (
                    <>
                      <Link
                        to={`/learn/${course._id}`}
                        className="btn btn-outline-dark w-100 mt-2"
                      >
                        Go To Course
                      </Link>

                      <div className="mt-3">
                        <div className="progress">
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${progress}%` }}
                          >
                            {progress}%
                          </div>
                        </div>

                        {progress === 100 && (
                          <button
                            className="btn btn-success w-100 mt-3"
                            onClick={() =>
                              downloadCertificate(course.C_title)
                            }
                          >
                            Download Certificate
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  {user?.type === "student" && !isEnrolled && (
                    <button
                      className="btn btn-warning w-100 mt-2 fw-bold"
                      onClick={() => purchaseCourse(course._id)}
                    >
                      {course.C_price > 0 ? "Buy Now" : "Enroll Free"}
                    </button>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;