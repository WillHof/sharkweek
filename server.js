const express = require("express");
const path = require("path");
require("dotenv").config();
const { google } = require("googleapis");
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;
const session = require('express-session')


// Sets up the Express Session Library
// https://www.npmjs.com/package/express-session
app.use(session({
    secret: 'cat'
}))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static directory
app.use(express.static("public"));

//sets up googleOAuth
const oauth2Client = new google.auth.OAuth2(
    process.env.GClientID,
    process.env.GSecret,
    "https://sharkweek-54.herokuapp.com/home"
);

const scopes = [
    "https://www.googleapis.com/auth/calendar.events"
];
const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
})
module.exports = { url, scopes, oauth2Client }
// Routes
require("./routing/htmlRoutes")(app);
require("./routing/apiRoutes")(app);

// Requiring our models for syncing
var db = require("./models");

// sequelize
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// starting our Express app/db

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});


