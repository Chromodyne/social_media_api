const router = require("express").Router();
const { getUsers } = require("../../controllers/userController.js");

//TODO: Add proper routing to mongoose here.
router.route("/").get(getUsers);

module.exports = router;