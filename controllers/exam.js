const { Exam } = require("../models/exam");
const { Question } = require("../models/question");

exports.getExamById = (req, res, next, id) => {
    Exam.findById(id).exec((err, exam) => {
        if (err || !exam) {
            return res.status(400).json({
                error: "No exam found",
            });
        }

        req.exam = exam;

        next();
    });
};

exports.getExam = (req, res) => {
    return res.json(req.exam);
};

exports.getAllExams = (req, res) => {
    Exam.find().exec((err, exam) => {
        if (err || !exam) {
            return res.status(400).json({
                error: "No exams found in database",
                msg: err.message,
            });
        }

        return res.json(exam);
    });
};

exports.createExam = (req, res) => {
    const exam = new Exam(req.body);

    exam.save((err, exam) => {
        if (err || !exam) {
            return res.status(400).json({
                error: "Failed to create exam",
                msg: err.message,
            });
        }

        return res.json(exam);
    });
};

exports.updateExam = (req, res) => {
    Exam.findByIdAndUpdate(
        { _id: req.exam._id },
        { $set: req.body },
        { new: true },
        (err, exam) => {
            if (err || !exam) {
                return res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            return res.json(exam);
        }
    );
};

exports.deleteExam = (req, res) => {
    console.log("delete exam");
    Exam.deleteOne({ _id: req.exam._id }, (err, exam) => {
        if (err || !exam) {
            return res.status(400).json({ error: "Failed to find exam" });
        }
        console.log("delete exam", { exam });

        exam.questions.map((quesId) => {
            Question.findByIdAndRemove(quesId).exec((err, question) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ error: "Failed to delete questions" });
                }
            });
        });

        return res.json({ msg: "Exam successfully deleted" });
    });
};

exports.getAllQuestionsOfExam = (req, res) => {
    Exam.findById(req.exam._id)
        .populate("questions")
        .exec((err, exam) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: "Failed to find exam", msg: err.message });
            }

            return res.json(exam.questions);
        });
};
