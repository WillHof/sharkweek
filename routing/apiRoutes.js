var db = require("../models");

module.exports = function (app) {
    // Find all Authors and return them to the user with res.json
    // app.get("/api/authors", function(req, res) {
    //   db.Author.findAll({}).then(function(dbAuthor) {
    //     res.json(dbAuthor);
    //   });
    // });

    // app.get("/api/authors/:id", function(req, res) {
    //   // Find one Author with the id in req.params.id and return them to the user with res.json
    //   db.Author.findOne({
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then(function(dbAuthor) {
    //     res.json(dbAuthor);
    //   });
    // });

    app.post("/api/createAccount", function (req, res) {
        // Create a new User with the data available to us in req.body
        console.log(req.body);
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // app.delete("/api/authors/:id", function(req, res) {
    //   // Delete the Author with the id available to us in req.params.id
    //   db.Author.destroy({
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then(function(dbAuthor) {
    //     res.json(dbAuthor);
    //   });
    // });

};