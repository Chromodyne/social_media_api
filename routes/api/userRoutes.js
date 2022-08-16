//Imports
const router = require("express").Router();
//Destructure user controller exports for use later.
const { getUsers, getOneUser, createUser, deleteUser } = require("../../controllers/userController.js");

//Gets all users in the database on a GET request or creates a new user on a POST request.
router.route("/").get(getUsers).post(createUser);

//Get a user by the id specified in the parameter on GET, delete the user on DELETE.
router.route("/:userId").get(getOneUser).delete(deleteUser);



module.exports = router;