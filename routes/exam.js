const express = require("express");

const router = express.Router();

const {
    getExamById,
    getExam,
    getPopulatedExamById,
    getAllExams,
    createExam,
    updateExam,
    deleteExam,
    getAllQuestionsOfExam,
    getEnrolledUsersExam,
    getAllAnswers,
} = require("../controllers/exam");
const { getUserById } = require("../controllers/user");
const {
    isSignedIn,
    isAuthenticated,
    isInstructor,
} = require("../controllers/auth");

router.param("userId", getUserById);
router.param("examId", getExamById);

/**
 * @method GET
 * @param examId
 * @param userId
 * @route /api/exam/all-question/:examId/:userId
 * @description get all questions of a exam
 * @access public
 */
router.get(
    "/all-questions/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    getAllQuestionsOfExam
);

/**
 * @method GET
 * @param userId
 * @route /api/exam/:userId
 * @description get all exams for instructor or admin
 * @access private
 * !! TODO: change isInstructor to isAdmin
 */
router.get("/:userId", isSignedIn, isAuthenticated, isInstructor, getAllExams);

/**
 * @method GET
 * @param examId
 * @param userId
 * @route /api/exam/:examId/:userId
 * @description get exam by id
 * @access private
 */
router.get("/:examId/:userId", isSignedIn, isAuthenticated, getExam);

/**
 * @method GET
 * @param examId
 * @param userId
 * @route /api/exam/enrolled/:examId/:userId
 * @description get list of enrolled students
 * @access private
 */
router.get(
    "/enrolled/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getEnrolledUsersExam
);

/**
 * @method GET
 * @param examId
 * @param userId
 * @route /api/exam/populate/:examId/:userId
 * @description get populated exam by id
 * @access private
 */
router.get(
    "/populate/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    getPopulatedExamById
);

/**
 * @method GET
 * @param examId
 * @param userId
 * @route /api/exam/all-answers/:examId/:userId
 * @description get all the answers for the required exam
 * @access private
 */
router.get(
    "/all-answers/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getAllAnswers
);

/**
 * @method POST
 * @param examId
 * @param userId
 * @route /api/exam/:userId
 * @description create exam
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated, isInstructor, createExam);

/**
 * @method PUT
 * @param examId
 * @param userId
 * @route /api/exam/:examId/:userId
 * @description update exam
 * @access private
 */
router.put(
    "/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    updateExam
);

/**
 * @method DELETE
 * @param examId
 * @param userId
 * @route /api/exam/:examId/:userId
 * @description delete exam
 * @access private
 */
router.delete(
    "/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    deleteExam
);

module.exports = router;
