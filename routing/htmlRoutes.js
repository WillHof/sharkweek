const path = require("path");
const url = require("../server.js")
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
    process.env.GClientID,
    process.env.GSecret,
    "https://sharkweek-54.herokuapp.com/home"
);


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
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });
    app.get("/createAccount", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/createaccount.html"))
    });
    app.get("/home", async function (req, res) {
        console.log(process.env.GClientID)
        console.log(req.query.code)
        if (req.query.code) {
            const { tokens } = await oauth2Client.getToken(req.query.code)
            oauth2Client.setCredentials(tokens);
        }
        res.sendFile(path.join(__dirname, "../public/home.html")
        )
    });
    app.get("/sofamhome", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/sofamhome.html"))
    });
    app.get("/purchase", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/purchase.html"))
    });
}
