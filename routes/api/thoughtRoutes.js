const router = require("express").Router();
const { getThoughts,
        getOneThought,
        createThought,
        deleteThought,
        updateThought,
        createReaction,
        deleteReaction} = require("../../controllers/thoughtController");

//Used to get and post thoughts.
router.route("/").get(getThoughts).post(createThought);

//Used to get an individual thought, delete an individual thought, or update an individual thought.
router.route("/:thoughtId").get(getOneThought).delete(deleteThought).put(updateThought);

//Used to add and remove reactions to thoughts.
router.route("/:thoughtId/reaction").post(createReaction).delete(deleteReaction);

module.exports = router;