const { McqQuestion } = require("../models/mcqQuestion");
const { Exam } = require("../models/exam");

exports.getQuestionById = (req, res, next, id) => {
    McqQuestion.findById(id).exec((err, question) => {
        if (err || !mcqQuestion) {
            return res.status(400).json({
                error: "No question found",
                msg: err,
            });
        }

        req.mcqQuestion = mcqQuestion;

        next();
    });
};

exports.getAllMcqQuestions = (req, res) => {
    McqQuestion.find().exec((err, mcqQuestion) => {
        if (err) {
            return res.status(400).json({
                error: "No MCQ questions found in database",
                msg: err.message,
            });
        }

        return res.json(mcqQuestion);
    });
};

exports.createMcqQuestion = (req, res) => {
    const newMcqQuestion = new McqQuestion(req.body);

    newMcqQuestion.save((err, mcqQuestion) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "Failed to create Mcq Questions", msg: err });
        }

        const { examId } = req.params;
        const { _id: newMcqQuestionId } = newMcqQuestion;

        Exam.findByIdAndUpdate(
            examId,
            { $push: { mcqQuestions: newMcqQuestionId } },
            { new: true, upsert: true },
            (err, exam) => {
                if (err || !exam) {
                    return res.status(400).json({
                        error: "Failed to update exam mcqQuestions",
                        msg: err.message,
                    });
                }
            }
        );

        return res.json(mcqQuestion);
    });
};

exports.updateMcqQuestion = (req, res) => {
    McqQuestion.findByIdAndUpdate(
        { _id: req.mcqQuestion._id },
        {
            $set: req.body,
        },
        { new: true },
        (err, mcqQuestion) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: "Not Authorized", message: err });
            }

            return res.json(mcqQuestion);
        }
    );
};

exports.deleteQuestion = (req, res) => {
    const { _id: mcqQuesId } = req.mcqQuestion;
    const { _id: examId } = req.exam;

    Exam.findByIdAndUpdate(
        {
            _id: examId,
        },
        { $pull: { mcqQuestions: mcqQuesId } },
        (err, exam) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to delete mcq question's id from Exam",
                    msg: err,
                });
            }

            McqQuestion.deleteOne({ _id: mcqQuesId }).exec(
                (err, mcqQuestion) => {
                    if (err || !mcqQuestion) {
                        return res.status(400).json({
                            error: "Failed to delete mcq questions from McqQuestion",
                            msg: err,
                        });
                    }
                }
            );

            return res.json({ msg: "Successfully deleted", exam });
        }
    );
};
