const { Answer } = require("../models/answer");
const { Exam } = require("../models/exam");

exports.getAnswerById = (req, res, next, id) => {
    Answer.findById(id).exec((err, answer) => {
        if (err || !answer) {
            return res.status(400).json({ error: "No answer found", msg: err });
        }
        req.answer = answer;

        next();
    });
};

exports.getAnswer = (req, res) => {
    return res.json(req.answer);
};

exports.createAnswer = (req, res) => {
    const newAnswer = new Answer(req.body);
    const { _id: examId } = req.exam;

    newAnswer.save((err, answer) => {
        console.log({ answer });
        if (err || !answer) {
            return res.status(400).json({ error: "" });
        }
        Exam.findByIdAndUpdate(
            examId,
            { $push: { answers: answer._id } },
            { new: true, upsert: true },
            (err, exam) => {
                if (err || !exam) {
                    return res.status(400).json({
                        error: "Failed to update answer field of Exam schema",
                        msg: err,
                    });
                }
                return res.json({ answer, exam: exam.answer });
            }
        );
    });
};

exports.updateAnswer = (req, res) => {
    const { _id: answerId, submitted_by } = req.answer;

    Answer.findByIdAndUpdate(
        answerId,
        { $set: req.body },
        { new: true },
        (err, answer) => {
            if (err || !answer) {
                return res.status(400).json({
                    error: `Failed to update answer submitted by: ${submitted_by}`,
                    msg: err,
                });
            }

            return res.json(answer);
        }
    );
};
