const mongoose = require("mongoose");
const { Schema } = mongoose;

const examSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        course_coordinator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        answers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Answer",
            },
        ],
        start_date: { type: Date, required: true },
        active_for: { type: Date, required: true },
        time_limit: { type: Number, required: true },
        total_marks: { type: Number, required: true },
    },
    { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

module.exports = { Exam };
