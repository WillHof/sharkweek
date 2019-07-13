var db = require("../models");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config()
const server = require("../server.js")
module.exports = function (app) {

    app.post("/api/calendar", function (req, res) {
        // authorize(server.oauth2Client, addEvent).then(res.json("this worked"))
        // function authorize(credentials, callback) {
        //     let oAuthClient = server.oauth2Client
        //     fs.readFile("token.json", (err, token) => {
        //         if (err) return console.log("not logged in");
        //         oAuthClient.setCredentials(JSON.parse(token));
        //         callback(oAuthClient)
        //     });
        // }
        //get this to pull user data
        let oAuthClient = server.oauth2Client;
        addEvent(oAuthClient).then(res.json("It Worked"))
        function addEvent(auth) {
            console.log("addEvent begin")
            const calendar = google.calendar({ version: 'v3', auth });
            var event = {
                'summary': "Appointment test",
                'location': "Somewhere",
                'start': {
                    "date": "2019-07-01"
                },
                'end': {
                    "date": "2019-07-02"
                },
                'recurrence': [
                    "EXDATE;VALUE=DATE:20190610",
                    "RDATE;VALUE=DATE:20190609,20190611",
                    "RRULE:FREQ=DAILY;UNTIL=20190728;INTERVAL=3"
                ],
                'attendees': [
                    {
                        "email": "thehorrorofkurtz@gmail.com"
                    }
                ]
            };
            //what does this do
            calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            }, (err, gRes) => {
                if (err) {
                    return console.log('The API returned an error: ' + err);
                }

                else {
                    console.log('no error.');
                }
            });

        };
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