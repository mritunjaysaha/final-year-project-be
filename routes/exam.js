const express = require("express");

const router = express.Router();

const {
    getExamById,
    getExam,
    getAllExams,
    createExam,
    updateExam,
    deleteExam,
    getAllQuestionsOfExam,
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
 * @param userId
 * @param examId
 * @route /api/exam/:examId/:userId
 * @description get all questions of a exam
 * @access private
 */

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
router.get(
    "/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getExam
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

module.exports = router;
