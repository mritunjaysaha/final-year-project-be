const express = require("express");
const router = express.Router();

const {
    getMcqQuestionById,
    getAllMcqQuestions,
    createMcqQuestion,
    updateMcqQuestion,
    removeMcqQuestion,
} = require("../controllers/mcqQuestions");

const { getUserById } = require("../controllers/user");
const { getExamById } = require("../controllers/exam");
const {
    isSignedIn,
    isAuthenticated,
    isInstructor,
    isAdmin,
} = require("../controllers/auth");

router.param("mcqQuestionId", getMcqQuestionById);
router.param("examId", getExamById);
router.param("userId", getUserById);

/**
 * @method GET
 * @param mcqQuestionId
 * @param userId
 * @route /api/mcqQuestion/:mcqQuestionById/:userId
 * @description get mcq question by ID
 * @access private
 */
router.get(
    "/:mcqQuestionById/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getMcqQuestionById
);

/**
 * @method GET
 * @param userId
 * @route /api/mcqQuestion/allMcqQuestions/:userId
 * @description get all mcq questions
 * @access private
 */
router.get(
    "/allMcqQuestions/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getAllMcqQuestions
);

/**
 * @method POST
 * @param examId
 * @param userId
 * @route /api/mcqQuestion/:examId/:userId
 * @description create a mcq question
 * @access private
 */
router.post(
    "/:examId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    createMcqQuestion
);

/**
 * @method PUT
 * @param mcqQuestionId
 * @param userId
 * @route /api/mcqQuestion/:mcqQuestionId/:userId
 * @description update mcq question
 * @access private
 */
router.put(
    "/:mcqQuestionId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    updateMcqQuestion
);

/**
 * @method DELETE
 * @param examId
 * @param mcqQuestionId
 * @param userId
 * @route /api/mcqQuestion/:examId/:mcqQuestionId/:userId
 * @description delete mcq question
 * @access private
 */
router.delete(
    "/:examId/:mcqQuestionId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    removeMcqQuestion
);

module.exports = router;
