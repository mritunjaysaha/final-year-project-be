const express = require("express");

const router = express.Router();

const { getUserById } = require("../controllers/user");
const { getExamById } = require("../controllers/exam");
const {
    getAnswerById,
    getAnswer,
    createAnswer,
    updateAnswer,
    updateMarks,
} = require("../controllers/answer");
const {
    isInstructor,
    isSignedIn,
    isAuthenticated,
} = require("../controllers/auth");

router.param("userId", getUserById);
router.param("examId", getExamById);
router.param("answerId", getAnswerById);

/**
 * @method GET
 * @param answerId
 * @param userId
 * @route /api/answer/:answerId/:userId
 * @description get the answer by answerId
 * @access private
 */
router.get(
    "/:answerId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getAnswer
);

/**
 * @method POST
 * @param examId
 * @param userId
 * @route /api/answer/:examId/:userId
 * @description push the answer id into the exam schema
 * @access private
 */
router.post("/:examId/:userId", isSignedIn, isAuthenticated, createAnswer);

/**
 * @method PUT
 * @param examId
 * @param userId
 * @route /api/answer/:answerId/:userId
 * @description update the exam details
 * @access private
 */
router.put("/:answerId/:userId", isSignedIn, isAuthenticated, updateAnswer);

/**
 * @method PUT
 * @param answerId
 * @param userId
 * @route /api/answer/marks/:answerId/:userId
 * @description set marks
 * @access private
 */
router.put(
    "/marks/:answerId/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    updateMarks
);

module.exports = router;
