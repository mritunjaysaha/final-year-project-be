const express = require("express");
const router = express.Router();

const {
    getCourseById,
    createCourse,
    getCourse,
    getAllCourses,
} = require("../controllers/course");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("courseId", getCourseById);

// routes
/**
 * @method GET
 * @param userId
 * @route /api/course/all-courses/:userId
 * @description get all courses
 * @access private
 */
router.get("/:userId", isSignedIn, isAuthenticated, isAdmin, getAllCourses);

/**
 * @method POST
 * @param userId
 * @route /api/course/:userId
 * @description create course
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated, isAdmin, createCourse);

/**
 * @method GET
 * @param courseId
 * @param userId
 * @route /api/course/:courseId/:userId
 * @description get a course by Id
 * @access private
 */
router.get("/:courseId/:userId", isSignedIn, isAuthenticated, getCourse);

module.exports = router;
