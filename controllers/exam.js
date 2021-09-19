const { Exam } = require("../models/exam");

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
    Exam.deleteOne({ _id: req.exam._id }, (err, exam) => {
        if (err || !exam) {
            return res.status(400).json({ error: "Failed to find exam" });
        }

        return res.json({ msg: "Exam successfully deleted" });
    });
};
