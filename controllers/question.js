const { Question } = require("../models/question");
const { Exam } = require("../models/exam");

exports.getQuestionById = (req, res, next, id) => {
    Question.findById(id).exec((err, question) => {
        if (err || !question) {
            return res.status(400).json({
                error: "No question found",
                msg: err.message,
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
    const newQuestion = new Question(req.body);

    newQuestion.save((err, question) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "Failed to create question", msg: error });
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

                return res.json({ exam, question });
            }
        );
    });
};

exports.updateQuestion = (req, res) => {
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
    Question.deleteOne({ _id: req.question._id }, (err, question) => {
        if (err) {
            return res.status(400).json({ error: "Failed to find questions" });
        }

        return res.json({ msg: "Question successfully deleted" });
    });
};
