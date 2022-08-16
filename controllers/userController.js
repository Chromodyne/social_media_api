const User = require("../models/User");

module.exports = {
    //Get all users request.
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },

    //Get one user based on the user's ID passed in as a parameter.
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId}).select("-__v")
            .then(async (user) => {
                !user ? res.status(404).json({ message: "User not found." })
                    : res.json(user)
            }).catch((err) => {
                console.log(err);
                return res.status(500).json(err);
        });
    },

    //Create a new user using the body of the POST request.
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user)).catch((err) => res.status(500).json(err));
    },

    //Delete a user based on the user's ID passed in as a parameter.
    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.userId })
            .then((user) => res.json(user)).catch((err) => res.status(500).json(err));
    }
}