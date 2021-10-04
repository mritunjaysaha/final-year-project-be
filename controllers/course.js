const { Course } = require("../models/course");
const { User } = require("../models/user");

exports.getCourseById = (req, res, next, id) => {
    Course.findById(id).exec((err, course) => {
        if (err) {
            res.status(400).json({ error: "Course not found" });
        }

        req.course = course;

        next();
    });
};

exports.createCourse = (req, res) => {
    const course = new Course(req.body);
    console.log("createCourse");
    course.save((err, course) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "failed to create course", msg: err.message });
        }

        User.findByIdAndUpdate(
            req.profile._id,
            { $push: { courses: course._id } },
            { new: true, upsert: true },
            (err, user) => {
                if (err || !user) {
                    return res
                        .status(400)
                        .json({ error: "Failed to create course", msg: err });
                }

                return res.json(course);
            }
        );
    });
};

exports.getCourse = (req, res) => {
    return res.json(req.course);
};

exports.getAllCourses = (req, res) => {
    Course.find().exec((err, course) => {
        if (err) {
            res.status(400).json({ error: "No courses found" });
        }

        res.json(course);
    });
};

/**
 * Use this function to
 * update the name of the course
 * update the students enrolled in the course
 */
exports.updateCourse = (req, res) => {
    const { _id: courseId } = req.course;

    Course.findByIdAndUpdate(
        courseId,
        { $set: req.body },
        { new: true },
        (err, course) => {
            if (err || !course) {
                res.status(400).json({
                    error: "Not authorized to update information",
                    msg: err.message,
                });
            }

            if (req.body.hasOwnProperty("students")) {
                req.body.students.map((student) => {
                    User.findByIdAndUpdate(
                        student,
                        {
                            $push: { courses: courseId },
                        },
                        { new: true, upsert: true },

                        (err, user) => {
                            if (err || !user) {
                                return res.status(400).json({
                                    error: "Failed to populate courses for students",
                                    msg: err,
                                });
                            }
                        }
                    );
                });
            }

            return res.json(course);
        }
    );
};

exports.removeCourse = (req, res) => {
    Course.deleteOne({ _id: req.params.courseId }, (err, course) => {
        if (err) {
            res.status(400).json({ error: "Failed to find course" });
        }
        res.json({ msg: "Course successfully deleted" });
    });
};

exports.getEnrolledUsersCourse = (req, res) => {
    Course.findById(req.course._id)
        .populate("students")
        .exec((err, course) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to find students",
                    msg: err.message,
                });
            }

            course.students.map((student) => {
                student.salt = undefined;
                student.encrypted_password = undefined;
                student.createdAt = undefined;
                student.updatedAt = undefined;
                student.role = undefined;
            });

            return res.json(course.students);
        });
};
