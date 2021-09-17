const mongoose = require("mongoose");

const { Schema } = mongoose;

const CourseSchema = new Schema(
    {
        course_name: {
            type: String,
            required: true,
        },
        course_coordinator: {
            type: String,
            required: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = { Course };
