//Imports
const router = require("express").Router();
//Destructure user controller exports for use later.
const { getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
    } = require("../../controllers/userController.js");

//Gets all users in the database on a GET request or creates a new user on a POST request.
router.route("/").get(getUsers).post(createUser);

//Get a user by the id specified in the parameter on GET, delete the user on DELETE.
router.route("/:userId").get(getOneUser).delete(deleteUser).put(updateUser);

//Add a friend to the friend array of the user or delete one.
router.route("/:userId/friend").post(addFriend).delete(deleteFriend);

module.exports = router;