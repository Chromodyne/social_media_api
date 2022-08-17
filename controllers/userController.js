const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
    //Get all users request.
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },

    //Get one user based on the user's ID passed in as a parameter.
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId }).select("-__v")
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
    },

    //Update a user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            {
                username: req.body.username,
                email: req.body.email
            }, null,
            function (err, docs) {
                if(err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    console.log("User updated successfully.");
                    res.status(200).json(docs);
                }
            });

    },

    //Adds a friend to the friend array of a user.
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.body},
            username: req.body.username},
            {runValidators: true, new: true}, function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json({ message: "Friend added successfully."});
                }
            }
        )},

    //Deletes a friend from the friend array of the user.
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.thoughtId},
            {$pull: { friends: { _id: req.body}}},
            { new: true}, function(err) {
                if(err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json({ message: "Friend removed successfully."});
                }
            }
        )},

}