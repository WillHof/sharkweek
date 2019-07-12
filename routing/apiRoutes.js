var db = require("../models");
const path = require("path")
module.exports = function (app) {

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