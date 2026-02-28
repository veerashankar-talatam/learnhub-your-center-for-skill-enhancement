const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedSections: [
      {
        type: Number,
      },
    ],

    progress: {
      type: Number,
      default: 0,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "EnrolledCourse",
  enrolledCourseSchema
);