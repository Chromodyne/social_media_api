const router = require("express").Router();
const { getUsers, getOneUser } = require("../../controllers/userController.js");

//Gets all users in the database or create a new user.
router.route("/").get(getUsers); //.post(createUser);

//Get a user by the id specified in the parameter.
router.route("/:userId").get(getOneUser);

module.exports = router;