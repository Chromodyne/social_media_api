//Imports
const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//Once database is open, start server.
db.once("open", () => {
   app.listen(PORT, () => {
       console.log(`Social Media API Listening on port: ${PORT}`);
   });
});