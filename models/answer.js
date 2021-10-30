const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema(
    {
        question: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        data: { type: "string", required: true },
        submitted_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = { Answer };
