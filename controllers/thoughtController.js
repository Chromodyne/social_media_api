const Thought = require("../models/Thought");

module.exports = {

    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts)).catch((err) => res.status(500).json(err));
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId}).select("-__v")
            .then(async (thought) => {
                !thought ? res.status(404).json({ message: "Thought not found." })
                    : res.json(thought)
            }).catch((err) => {
                console.log(err);
                return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    }

}