const express = require("express");
const router = express.Router();

const {
    getQuestionById,
    getAllQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/question");
const { getUserById } = require("../controllers/user");
const { getExamById } = require("../controllers/exam");
const {
    isSignedIn,
    isAuthenticated,
    isInstructor,
    isAdmin,
} = require("../controllers/auth");

router.param("questionId", getQuestionById);
router.param("examId", getExamById);
router.param("userId", getUserById);

/**
 * @method GET
 * @param userId
 * @param questionId
 * @route /api/question/:questionId/:userId
 * @description get question by id
 * @access private
 */
router.get(
    "/:questionId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getQuestion
);

/**
 * @method POST
 * @param userId
 * @param examId
 * @route /api/question/:examId/:userId
 * @description create question
 * @access private
 */
router.post(
    "/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    createQuestion
);

/**
 * @method PUT
 * @param userId
 * @param questionId
 * @param examId
 * @route /api/question/:examId/:questionId/:userId
 * @description update question
 * @access private
 */
router.put(
    "/:examId/:questionId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    updateQuestion
);

/**
 * @method DELETE
 * @param userId
 * @param questionId
 * @param examId
 * @route /api/question/:examId/:questionId/:userId
 * @description delete question
 * @access private
 */
router.delete(
    "/:examId/:questionId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    deleteQuestion
);

module.exports = router;
