const express = require("express");

const router = express.Router();

const { getUserById } = require("../controllers/user");
const { getExamById } = require("../controllers/exam");
const {
    isInstructor,
    isSignedIn,
    isAuthenticated,
} = require("../controllers/auth");

router.param("userId", getUserById);
router.param("examId", getExamById);

/**
 * @method GET
 * @param answerId
 * @param userId
 * @route /api/answer/:answerId/:userId
 * @description get the answer by answerId
 * @access private
 */

/**
 * @method POST
 * @param examId
 * @param userId
 * @route /api/answer/:examId/:userId
 * @description push the answer id into the exam schema
 * @access private
 */

/**
 * @method PUT
 * @param examId
 * @param userId
 * @route /api/answer/:answerId/:userId+
 * @description update the exam details
 * @access private
 */
