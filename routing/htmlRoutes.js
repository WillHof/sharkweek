const path = require("path");
const url = require("../server.js").url
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
    process.env.GClientID,
    process.env.GSecret,
    "https://sharkweek-54.herokuapp.com/home"
);
const db = require("../models")
const fs = require("fs")

module.exports = function (app) {
    app.get("/url", function (req, res) {
        res.send(url)

    });
    app.get("/token", function (req, res) {

    })
    app.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"))
    });
    app.get("/", function (req, res) {
        r
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });
    app.get("/createAccount", function (req, res) {
        req.session.user = "email"
        res.sendFile(path.join(__dirname, "../public/createaccount.html"))
    });
    app.get("/home", async function (req, res) {
        if (req.query.code) {
            const { tokens } = await oauth2Client.getToken(req.query.code)
            oauth2Client.setCredentials(tokens);
            fs.writeFile("token.json", JSON.stringify(tokens), (err) => {
                if (err) return console.error(err);
                res.JSON('Token stored to token.json');
            });
        }
        res.sendFile(path.join(__dirname, "../public/home.html")
        )
    });
    app.get("/sofamhome", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/sofamhome.html"))
    });
    app.get("/purchase", function (req, res) {
        console.log(req.session.user)
        res.sendFile(path.join(__dirname, "../public/purchase.html"))
    });
    app.post("/checkLogin", function (req, res) {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(results => {
            if (results) {
                console.log("got results")
                res.sendFile(path.join(__dirname, "../public/home.html"))
            }
            else {
                console.log("no matches")
                res.sendFile(path.join(__dirname, "../public/index.html"))
            }
        });
    });
}
