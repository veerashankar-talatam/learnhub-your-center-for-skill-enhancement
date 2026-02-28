const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Course = require("../models/Course");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// ADMIN DASHBOARD
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    if (req.user.type.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ type: "student" });
    const totalTeachers = await User.countDocuments({ type: "teacher" });
    const totalCourses = await Course.countDocuments();

    const courses = await Course.find();
    let totalEnrollments = 0;

    courses.forEach(course => {
      totalEnrollments += course.enrolled;
    });

    res.json({
      totalUsers,
      totalStudents,
      totalTeachers,
      totalCourses,
      totalEnrollments
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// GET ALL USERS (ADMIN ONLY)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.type.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const users = await User.find().select("-password");
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE USER
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.type.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;