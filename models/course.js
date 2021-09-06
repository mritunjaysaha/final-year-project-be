const mongoose = require("mongoose");

const { Schema } = mongoose;

const CourseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
        },
        courseCoordinator: {
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
