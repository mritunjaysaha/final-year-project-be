const express = require("express");

const router = express.Router();

const {
    getExamById,
    getExam,
    getAllExams,
    createExam,
    updateExam,
    deleteExam,
} = require("../controllers/exam");
const { getUserById } = require("../controllers/user");
const {
    isSignedIn,
    isAuthenticated,
    isInstructor,
    isAdmin,
} = require("../controllers/auth");

router.param("userId", getUserById);
router.param("examId", getExamById);

/**
 * @method GET
 * @param userId
 * @route /api/exam/:userId
 * @description get all exams for instructor or admin
 * @access private
 */
router.get("/:userId", isSignedIn, isAuthenticated, isAdmin, getAllExams);

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

module.exports = router;
