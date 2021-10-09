const { Question } = require("../models/question");
const { Exam } = require("../models/exam");

exports.getQuestionById = (req, res, next, id) => {
    Question.findById(id).exec((err, question) => {
        if (err || !question) {
            return res.status(400).json({
                error: "No question found",
                msg: err,
            });
        }

        req.question = question;

        next();
    });
};

exports.getAllQuestions = (req, res) => {
    Question.find().exec((err, question) => {
        if (err) {
            return res.status(400).json({
                error: "No questions found in database",
                msg: err.message,
            });
        }

        return res.json(question);
    });
};

exports.getQuestion = (req, res) => {
    return res.json(req.question);
};

exports.createQuestion = (req, res) => {
    console.log("createQuestion");
    const newQuestion = new Question(req.body);

    newQuestion.save((err, question) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "Failed to create question", msg: err });
        }

        const { _id: examId } = req.exam;
        const { _id: newQuesId } = newQuestion;

        Exam.findByIdAndUpdate(
            examId,
            { $push: { questions: newQuesId } },
            { new: true, upsert: true },
            (err, exam) => {
                if (err || !exam) {
                    return res.status(400).json({
                        error: "Failed to update exam questions",
                        msg: err.message,
                    });
                }
            }
        );

        return res.json(question);
    });
};

exports.updateQuestion = (req, res) => {
    console.log("updated");
    Question.findByIdAndUpdate(
        { _id: req.question._id },
        { $set: req.body },
        { new: true },
        (err, question) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: "Not authorized", message: err });
            }

            return res.json(question);
        }
    );
};

exports.deleteQuestion = (req, res) => {
    const { _id: quesId } = req.question;
    const { _id: examId } = req.exam;

    Exam.findByIdAndUpdate(
        { _id: examId },
        { $pull: { questions: quesId } },
        (err, exam) => {
            if (err) {
                return res.status(400).json({
                    error: "failed to delete question's id from Exam",
                    msg: err,
                });
            }

            Question.deleteOne({ _id: quesId }).exec((err, question) => {
                if (err || !question) {
                    return res.status(400).json({
                        error: "Failed to delete questions from Question",
                        msg: err,
                    });
                }
            });

            return res.json({ msg: "successfully deleted", exam });
        }
    );
};
