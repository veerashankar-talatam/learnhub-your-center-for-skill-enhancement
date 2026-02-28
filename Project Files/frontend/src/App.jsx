import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import AdminDashboard from "./pages/AdminDashboard";
import LearnCourse from "./pages/LearnCourse";
import { useEffect,useState } from "react";
import "./App.css";
function App() {
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/learn/:id" element={<LearnCourse />} />
      </Routes>
    </>
  );
}

export default App;