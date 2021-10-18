const express = require("express");
const router = express.Router();

const {
    getUser,
    getUserById,
    getAllUsers,
    getPopulatedCourses,
    updateUser,
    deleteUser,
    updateUserPhoto,
    getPhoto,
    deletePhoto,
} = require("../controllers/user");

const {
    isAuthenticated,
    isSignedIn,
    isInstructor,
} = require("../controllers/auth");

router.param("userId", getUserById);

/**
 * @route GET /api/user
 * @param userId
 * @description get all users
 * @access private
 */
router.get(
    "/all/:userId",
    isSignedIn,
    isAuthenticated,
    isInstructor,
    getAllUsers
);

// !PRIVATE ROUTES
/**
 * @route GET /api/user/:userId
 * @param userId
 * @description get the user details
 * @access private
 */
router.get("/:userId", isSignedIn, isAuthenticated, getUser);

/**
 * @method GET
 * @param userId
 * @route /api/user/populate-courses/:userId
 * @description Populate the courses with their details
 * @access private
 */
router.get(
    "/populated-courses/:userId",
    isSignedIn,
    isAuthenticated,
    getPopulatedCourses
);

/**
 * @route PUT /api/user/:userId
 * @param userId
 * @description update user details
 * @access private
 */
router.put("/:userId", isSignedIn, isAuthenticated, updateUser);

/**
 * @route DELETE /api/user/:userId
 * @param userId
 * @description delete user
 * @access private
 */
router.delete("/:userId", isSignedIn, isAuthenticated, deleteUser);

/**
 * @route POST /api/user/photo/:userId
 * @param userId
 * @description add photo
 * @access private
 */
router.post("/photo/:userId", isSignedIn, isAuthenticated, updateUserPhoto);

/**
 * @route GET /api/user/photo/:username
 * @param username
 * @description read photo
 * @access public
 */
router.get("/photo/:username", getPhoto);

/**
 * @route DELETE /api/user/photo
 * @param userId
 * @description delete photo
 * @access private
 */
router.delete("/photo/:userId", deletePhoto);

module.exports = router;
