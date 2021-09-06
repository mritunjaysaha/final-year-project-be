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
    const course = new Course(req.body);

    course.save((err, course) => {
        if (err) {
            res.status(400).json({ error: "Could not create course" });
        }

        res.json(course);
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
exports.updateCourse = (req, res) => {};

exports.removeCourse = (req, res) => {};
