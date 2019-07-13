var db = require("../models");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config()
const server = require("../server.js")
const moment = require("moment")
module.exports = function (app) {

    app.post("/api/calendar", function (req, res) {
        console.log(req.body)
        // authorize(server.oauth2Client, addEvent).then(res.json("this worked"))
        createEventObject(req.body)
        function authorize(credentials, callback) {
            let oAuthClient = server.oauth2Client
            fs.readFile("token.json", (err, token) => {
                if (err) return console.log("not logged in");
                oAuthClient.setCredentials(JSON.parse(token));
                callback(oAuthClient)
            });
        }
        function createEventObject(user) {
            db.Update.findAll({
                where: user
            }).then(data => {
                let userInfo = data.dataValues
                let recentData = data[data.length - 1].dataValues
                let predictedEarly = moment(recentData.nextPredictedDateOne).subtract(2, 'days').format()
                console.log(predictedEarly)
                let predictedLate = moment(recentData.nextPredictedDateOne).add(2, 'days').format()
                console.log(predictedLate)
                // let event = {
                //     'summary': 'Blood in the Water',
                //     'location': 'Down South',
                //     'start': {
                //         "date":predictedEarly
                //     }
                // 'end': {
                //     "date": predictedLate
                // },
                // 'recurrence': [
                //     "EXDATE;VALUE=DATE:20190610",
                //     "RDATE;VALUE=DATE:20190609,20190611",
                //     "RRULE:FREQ=DAILY;UNTIL=20200128;INTERVAL=3"
                // ],
                //     'attendees': [
                //         {
                //             email
                //         }
                //     ]
                // }
            })
        }
        function addEvent(auth) {
            console.log("addEvent begin")
            const email = req.body;
            const calendar = google.calendar({ version: 'v3', auth });
            var event = {
                'summary': "Different Test",
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
                        email
                    }
                ]
            };
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
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    app.post("/api/createAccountData", function (req, res) {
        // Create a new User with the data available to us in req.body
        db.Update.create(req.body).then(function (dbUserData) {
            res.json(dbUserData);
        });
    });
    app.post("/api/getUserData", function (req, res) {
        db.Update.findAll({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => res.json(dbUserData))
    });
    app.post("/api/updateAccountData", function (req, res) {
        db.Update.create(req.body).then(function (dbUserData) {
            res.json(dbUserData)
        })
    });
}