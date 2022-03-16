const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        exam: {
            type: Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },

        course_coordinator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        images: [
            {
                type: Buffer,
                contentType: String,
            },
        ],
        marks: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question };
