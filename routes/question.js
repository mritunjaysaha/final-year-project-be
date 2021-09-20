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
 * @param questionId
 * @param userId
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
 * @param examId
 * @param userId
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
 * @param questionId
 * @param userId
 * @route /api/question/:questionId/:userId
 * @description update question
 * @access private
 */
router.put(
    "/:questionId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    updateQuestion
);

/**
 * @method DELETE
 * @param examId
 * @param questionId
 * @param userId
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
