const mongoose = require("mongoose");
const { Schema } = mongoose;

const mcqQuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [
            {
                value: { type: String },
                isCorrect: { type: Boolean, default: null },
                answered: { type: String, default: null },
            },
        ],
        default: undefined,
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
});

const McqQuestion = mongoose.model("McqQuestion", mcqQuestionSchema);

module.exports = { McqQuestion };
