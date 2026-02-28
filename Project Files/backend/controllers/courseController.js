const Course = require("../models/Course");

// ================= ADD COURSE =================
exports.addCourse = async (req, res) => {
  try {
    if (req.user.type !== "teacher") {
      return res.status(403).json({ message: "Only teachers allowed" });
    }

    const {
      C_educator,
      C_categories,
      C_title,
      C_description,
      sections,
      C_price,
      modules,
    } = req.body;

    const newCourse = new Course({
      userID: req.user.id,
      C_educator,
      C_categories,
      C_title,
      C_description,
      sections,
      C_price,
      modules: modules || [],
      enrolled: 0,
      enrolledStudents: [],
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course Added Successfully",
      course: newCourse,
    });

  } catch (error) {
    console.log("ADD COURSE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= GET ALL =================
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= GET SINGLE =================
exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= ENROLL =================
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    course.enrolled += 1;
    await course.save();

    res.json({ message: "Enrolled Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};