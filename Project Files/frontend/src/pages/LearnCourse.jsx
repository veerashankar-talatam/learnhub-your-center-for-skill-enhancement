import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function LearnCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);

  const token = localStorage.getItem("token");

  const convertToEmbed = (url) => {
    if (!url) return "";

    if (url.includes("watch?v="))
      return url.replace("watch?v=", "embed/");

    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "youtube.com/embed/");

    return url;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data));
  }, [id]);

  // 🔥 MARK COMPLETE FUNCTION
  const markComplete = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/courses/progress/${id}`,
        { progress: 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course Completed Successfully 🎉");
      navigate("/courses");

    } catch (error) {
      alert(error.response?.data?.message || "Error updating progress");
    }
  };

  if (!course) return <h3 className="text-center mt-5">Loading...</h3>;

  const selectedModule = course.modules?.[currentModule];

  return (
    <div className="container mt-5">

      <div className="row">

        {/* MODULE LIST */}
        <div className="col-md-4">
          <div className="list-group">
            {course.modules.map((module, index) => (
              <button
                key={index}
                className={`list-group-item ${
                  currentModule === index ? "active" : ""
                }`}
                onClick={() => setCurrentModule(index)}
              >
                {index + 1}. {module.title}
              </button>
            ))}
          </div>
        </div>

        {/* VIDEO PLAYER */}
        <div className="col-md-8">

          {selectedModule ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={convertToEmbed(selectedModule.videoUrl)}
                title="video"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No Video</p>
          )}

          {/* 🔥 MARK COMPLETE BUTTON */}
          <button
            className="btn btn-success w-100 mt-4"
            onClick={markComplete}
          >
            ✅ Mark Course as Completed
          </button>

        </div>

      </div>

    </div>
  );
}

export default LearnCourse;