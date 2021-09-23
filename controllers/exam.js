const { Exam } = require("../models/exam");
const { Question } = require("../models/question");
const { User } = require("../models/user");

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
    const { _id: examId } = req.exam;
    console.log("updateExam");

    Exam.findByIdAndUpdate(
        examId,
        { $set: req.body },
        { new: true },
        (err, exam) => {
            if (err || !exam) {
                return res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            if (req.body.hasOwnProperty("students")) {
                req.body.students.map((student) => {
                    User.findByIdAndUpdate(
                        student,
                        { $push: { exams: examId } },
                        { new: true, upsert: true },
                        (err, user) => {
                            if (err || !user) {
                                return res.status(400).json({
                                    error: "Failed to populate exams",
                                    msg: err,
                                });
                            }
                        }
                    );
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

exports.getEnrolledUsersExam = (req, res) => {
    Exam.findById(req.exam._id)
        .populate("students")
        .exec((err, exam) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to find students",
                    msg: err,
                });
            }

            exam.students.map((student) => {
                student.salt = undefined;
                student.encrypted_password = undefined;
                student.createdAt = undefined;
                student.updatedAt = undefined;
                student.role = undefined;
            });

            return res.json(exam.students);
        });
};
