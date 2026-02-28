const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const courseController = require("../controllers/courseController");
const CoursePayment = require("../models/CoursePayment");
const Course = require("../models/Course");
// ADD COURSE
router.post("/", authMiddleware, courseController.addCourse);

// GET ALL
router.get("/", courseController.getCourses);

// GET SINGLE
router.get("/:id", courseController.getSingleCourse);

// ENROLL
router.post("/enroll/:id", authMiddleware, courseController.enrollCourse);

// ================= PURCHASE COURSE =================
router.post("/purchase/:id", authMiddleware, async (req, res) => {
  try {
    const { cardholdername, cardnumber, expmonthyear } = req.body;

    if (!cardholdername || !cardnumber || !expmonthyear) {
      return res.status(400).json({ message: "Payment details missing" });
    }

    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });
    if (!course.enrolledStudents) {course.enrolledStudents = [];
}

    if (req.user.type !== "student")
      return res.status(403).json({ message: "Only students allowed" });

    const already = course.enrolledStudents.find(
      (s) => s.userId.toString() === req.user.id
    );

    if (already)
      return res.status(400).json({ message: "Already purchased" });

    // ✅ Create Payment ID
    const paymentID =
      "PAY-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // ✅ Save Payment
    const payment = await CoursePayment.create({
      userID: req.user.id,
      courseID: course._id,
      amount: course.C_price,
      paymentID,
      cardDetails: {
      cardholdername,
      cardnumber,
      expmonthyear,
  },
  paymentStatus: "SUCCESS",
});

    // ✅ Enroll Student
    course.enrolledStudents.push({
      userId: req.user.id,
      progress: 0,
      purchased: true,
    });

    course.enrolled += 1;

    await course.save();

    res.json({
      message: "Payment Successful",
      paymentID: payment.paymentID,
    });

  } catch (error) {
    console.log("PURCHASE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
// ================= UPDATE PROGRESS =================
router.put("/progress/:id", authMiddleware, async (req, res) => {
  try {
    const { progress } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    if (!course.enrolledStudents)
      return res.status(400).json({ message: "No enrolled students" });

    const student = course.enrolledStudents.find(
      (s) => s.userId.toString() === req.user.id
    );

    if (!student)
      return res.status(404).json({ message: "Student not enrolled" });

    student.progress = Math.min(progress, 100);

    await course.save();

    res.json({ message: "Progress Updated Successfully" });

  } catch (error) {
    console.log("PROGRESS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;