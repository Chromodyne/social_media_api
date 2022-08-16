const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

//Just an error message if the incorrect route is chosen. :)
router.use((req, res) => {
    res.send("This is not the route you're looking for...");
});

module.exports = router;