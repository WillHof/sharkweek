const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(function (req, res, next) {
    console.log(req)
    console.log(res)
    // if (req.session.user === null) {
    //     //if user is not logged-in redirect back to login page //
    //     res.redirect('/');
    // } else {
    //     next()
    // }
});
// Routes
require("./routing/htmlRoutes")(app);
// require("./routing/apiRoutes")(app);

// starting our Express app
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


