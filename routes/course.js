const express = require("express");
const router = express.Router();

const {
    getCourseById,
    createCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    removeCourse,
    getEnrolledUsersCourse,
} = require("../controllers/course");
const {
    isSignedIn,
    isAuthenticated,
    isInstructor,
    isAdmin,
} = require("../controllers/auth");
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
 * @method GET
 * @param courseId
 * @param userId
 * @route /api/course/:courseId/:userId
 * @description get a course by Id
 * @access private
 */
router.get(
    "/:courseId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getCourse
);

/**
 * @method GET
 * @param courseId
 * @param userId
 * @route /api/course/enrolled/:courseId/:userId
 * @description get details of the students enrolled in a course
 * @access private
 */
router.get(
    "/enrolled/:courseId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getEnrolledUsersCourse
);

/**
 * @method POST
 * @param userId
 * @route /api/course/:userId
 * @description create course
 * @access private
 */
router.post(
    "/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    createCourse
);

/**
 * @method PUT
 * @param courseId
 * @param userId
 * @route /api/course/:courseId/:userId
 * @description update a course
 * @access private
 */
router.put(
    "/:courseId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    updateCourse
);

/**
 * @method DELETE
 * @param courseId
 * @param userId
 * @route /api/course/:courseId/:userId
 * @description remove a course
 * @access private
 */
router.delete(
    "/:courseId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    removeCourse
);

module.exports = router;
