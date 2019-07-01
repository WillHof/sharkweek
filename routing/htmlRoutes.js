const path = require("path");
const googleLogin = require("../public/app/app.js")

module.exports = function (app) {
    const checkAuth = (req, res, next) => {

        if (authenticated) next()

        /**
        * not authenticated. So add the previous route
        * to the req object and redirect
        */
        req.session.returnTo = req.path
        res.redirect('/')
    }

    // then check if you need to redirect in your login page

    app.get('/', (req, res) => {
        //... authenticate then...

        res.redirect(req.session.returnTo || '/home')
        // reset req object
        delete req.session.returnTo
    })

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
