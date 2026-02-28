import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Certificate() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  // ✅ Declare first
  const fetchCourse = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    const found = res.data.find((c) => c._id === id);
    setCourse(found);
  };

  // ✅ Then use
  useEffect(() => {
    fetchCourse();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!course) return <h3>Loading...</h3>;

  return (
    <div>
      <h1>Certificate</h1>
      <h2>{course.C_title}</h2>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
}

export default Certificate;