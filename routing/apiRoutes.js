var db = require("../models");

module.exports = function (app) {

    app.post("/api/createAccount", function (req, res) {
        // Create a new User with the data available to us in req.body
        console.log(req.body);
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });

};