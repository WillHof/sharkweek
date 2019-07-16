var db = require("../models");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config()
const server = require("../server.js")
const moment = require("moment")

module.exports = function (app) {
    app.post("/api/addCode", function (req, res) {
        console.log(req.body)
        let email = req.body.object[0];
        let sharedCode = req.body.object[1].sharedCode;
        console.log(email);
        console.log(sharedCode)
        db.Update.update(
            {
                "sharedCode": sharedCode
            },
            {
                where:
                    email

            }).then(data => { res.json(data) })
    })
    //google Calendar auth
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
    //get mainUsers code to share
    app.post("/api/getCode", function (req, res) {
        console.log(req.body)
        db.Update.findOne({
            where: req.body
        }).then(data => res.json(data.code))
    })
    //creates new user account
    app.post("/api/createAccount", function (req, res) {
        // Create a new User with the data available to us in req.body
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    //creates new user data row
    app.post("/api/createAccountData", function (req, res) {
        db.Update.create(req.body).then(function (dbUserData) {
            res.json(dbUserData);
        });
    });
    //gets data for the logged in user
    app.post("/api/getUserData", function (req, res) {
        db.Update.findAll({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => res.json(dbUserData))
    });
    //Joins family user to main user
    app.post("/api/getMainUserData", function (req, res) {
        db.Update.findAll({
            where: {
                "code": req.body.sharedCode
            }
        }).then(dbUserData => res.json(dbUserData))
    });
    app.post("/api/getAccountInfo", function (req, res) {
        db.User.findAll({
            where: {
                "email": req.body.email
            }
        }).then(function (dbUserData) { res.json(dbUserData) })
    });
    app.post("/api/updateAccountData", function (req, res) {
        db.Update.create(req.body).then(function (dbUserData) {
            res.json(dbUserData)
        })
    });
}