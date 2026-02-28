import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState(0);
  const [price, setPrice] = useState(0);

  const [modules, setModules] = useState([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddModule = () => {
    if (!moduleTitle || !videoUrl) {
      alert("Enter module title and video URL");
      return;
    }

    setModules([...modules, { title: moduleTitle, videoUrl }]);
    setModuleTitle("");
    setVideoUrl("");
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/courses",
        {
          C_educator: user.name,
          C_categories: category,
          C_title: title,
          C_description: description,
          sections,
          C_price: price,
          modules,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course Added Successfully");
      navigate("/courses");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-8 mx-auto">
        <h3 className="text-center mb-4">Add New Course</h3>

        <form onSubmit={handleAddCourse}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Sections"
            onChange={(e) => setSections(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <hr />

          <h5>Add Modules</h5>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Module Title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Add file"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={handleAddModule}
          >
            Add Module
          </button>

          <button type="submit" className="btn btn-primary w-100">
            Add Course
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddCourse;