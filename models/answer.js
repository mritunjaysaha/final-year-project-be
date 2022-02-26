const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema(
    {
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        data: { type: "string", required: true },
        submitted_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        marks: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = { Answer };
