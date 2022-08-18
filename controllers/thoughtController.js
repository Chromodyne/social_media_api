const Thought = require("../models/Thought");

module.exports = {

    //Get all thoughts on a GET request to /api/thought
    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts)).catch((err) => res.status(500).json(err));
    },

    //Get a specified thought on a GET request using the thought ID supplied as a parameter.
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

    //Create a new thought on a POST request using the body.
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },

    //Delete a thought.
    deleteThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId })
            .then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },

    //Update a thought with new information.
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                thoughtText: req.body.thoughtText,
                username: req.body.username
            }, null,
            function (err, docs) {
                if(err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    console.log("Thought updated successfully.");
                    res.status(200).json(docs);
                }
            });
    },

    //Create a reaction on the specified thought.
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body},
            username: req.body.username},
            {runValidators: true, new: true}).then((reaction) => {
            !thought ? res.status(404).json({message: "Thought does not exist."})
                : res.json(reaction);
        }).catch((err) => res.status(500).json(err));
    },

    //Delete a reaction to a thought based on the reactionId given in the json.
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId},
            {$pull: { reactions: { reactionId: req.body.reactionId}}},
            { new: true}, function(err) {
                if(err) {
                    console.log(err);
                    res.status(500).json(err);
                } else {
                    res.status(200).json({ message: "Successfully deleted."});
                }
            }
        )},

}