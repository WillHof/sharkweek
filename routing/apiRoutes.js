var db = require("../models");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config()
module.exports = function (app) {
    app.post("/api/calendar", function (req, res) {
        const calendar = google.calendar({ 'version': 'v3', 'auth': process.env.GAPIKey });
        let auth = fs.readFile("token.json", function (err, data) {
            if (err) throw err
            else {
                console.log(data)
                return data
            }
        })
        console.log(auth)
        console.log(process.env.GAPIKey)
        calendar.events.insert({
            auth,
            calendarId: 'primary',
            resource: calEvent
        }, (err, response) => {
            if (err) return console.log('The API returned an error: ' + err);
            else {
                console.log('Event CreatedL %s', event.htmlLink);
            }
        }).then(function (gResponse) {
            res.json(gResponse)
        });
    });
    app.post("/api/createAccount", function (req, res) {
        // Create a new User with the data available to us in req.body
        console.log(req.body);
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    app.post("/api/createAccountData", function (req, res) {
        // Create a new User with the data available to us in req.body
        console.log(req.body);
        db.Update.create(req.body).then(function (dbUserData) {
            res.json(dbUserData);
        });
    });
    app.post("/api/getUserData", function (req, res) {
        console.log(req.body);
        db.Update.findAll({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => res.json(dbUserData))
    });
    app.post("/api/updateAccountData", function (req, res) {
        console.log(req.body);
        db.Update.create(req.body).then(function (dbUserData) {
            res.json(dbUserData)
        })
    });



}