const router = require("express").Router();
const { getUsers, getOneUser, createUser } = require("../../controllers/userController.js");

//Gets all users in the database on a GET request or creates a new user on a POST request.
router.route("/").get(getUsers).post(createUser);

//Get a user by the id specified in the parameter.
router.route("/:userId").get(getOneUser);


module.exports = router;