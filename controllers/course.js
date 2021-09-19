const { Course } = require("../models/course");

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
    console.log("create course", req.body);

    const course = new Course(req.body);

    course.save((err, course) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "failed to create course", msg: err.message });
        }
        return res.json(course);
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
    console.log(req.body);
    Course.findByIdAndUpdate(
        { _id: req.course._id },
        { $set: req.body },
        { new: true },
        (err, course) => {
            if (err) {
                res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            res.json(course);
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
