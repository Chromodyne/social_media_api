const router = require("express").Router();
const { getThoughts,
        getOneThought,
        createThought,
        deleteThought,
        updateThought,
        createReaction} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getOneThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reaction").post(createReaction);

module.exports = router;