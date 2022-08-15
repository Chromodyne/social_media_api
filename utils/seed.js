const connection = require("../config/connection.js");
const { User } = require("../models");

const handleError = (err) => console.error(err);

//Once the server connection is established, run the enclosed logic.
connection.once("open", async () => {

    //Delete any existing users once connect.
    await User.deleteMany({});

    User.create(
        {
            username: "Devin",
            email: "thedude@gmail.com"
        },
        (err) => (err ? handleError(err) : console.log('Created new document'))
    );

});

module.exports = User;