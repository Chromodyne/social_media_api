const User = require("../models/User");

module.exports = {
    //Get all users request.
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId}).select("-__v")
            .then(async (user) => {
                !user ? res.status(404).json({ message: "User not found." })
                    : res.json(user) //Add proper functionality to this TODO
            }).catch((err) => {
                console.log(err);
                return res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user)).catch((err) => res.status(500).json(err));
    },
}