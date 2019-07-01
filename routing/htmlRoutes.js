const path = require("path");
const googleLogin = require("../public/app/app.js")

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     if (req.session.user == null) {
    //         // if user is not logged-in redirect back to login page //
    //         res.redirect('/');
    //     } else {
    //         next()
    //     }
    // });
    app.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"))
    });
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    app.get("/createAccount", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/createaccount.html"))
    })
    app.get("/home", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })
    app.get("/purchase", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/purchase.html"))
    })
}
