var db = require("../models");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config()
const server = require("../server.js")
const moment = require("moment")
module.exports = function (app) {

    app.post("/api/calendar", function (req, res) {

        authorize(server.oauth2Client, addEvent)
        //can resuse authorize function with other callbacks
        function authorize(credentials, callback) {
            let oAuthClient = server.oauth2Client
            fs.readFile("token.json", (err, token) => {
                if (err) return console.log("not logged in");
                oAuthClient.setCredentials(JSON.parse(token));
                callback(oAuthClient)
            });
        }


        function addEvent(auth) {
            const email = req.body;
            const calendar = google.calendar({ version: 'v3', auth });
            db.Update.findAll({
                where: email
            }).then(data => {
                let recentData = data[data.length - 1].dataValues;
                let predictedEarly = moment(recentData.nextPredictedDateOne).subtract(2, 'days').format('YYYY-MM-DD');
                let predictedLate = moment(recentData.nextPredictedDateOne).add(2, 'days').format('YYYY-MM-DD');
                let event = {
                    'summary': 'Blood in the Water',
                    'location': 'Down South',
                    'start': {
                        "date": predictedEarly
                    },
                    'end': {
                        "date": predictedLate
                    },
                    'recurrence': [
                        `RRULE:FREQ=DAILY;UNTIL=20200128;INTERVAL=${recentData.currentAverage}`
                    ],
                    'attendees': [
                        email
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
                        res.json(gRes);
                    }
                });
            })
        };
    });
    app.post("/api/getCode", function (req, res) {
        console.log(req.body)
        db.User.findOne({
            where: req.body
        }).then(data => res.json(data.code))
    })
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