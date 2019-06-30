const express = require("express");
const path = require("path");
const dotenv = require("dotenv")
const pg = require("pg")

dotenv.config()

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routing/htmlRoutes")(app);
// require("./routing/apiRoutes")(app);


// Heroku Postgres
const { Client } = require('pg');

const client = new Client({
    connectionString: `${process.env.DATABASE_URL}`,
    ssl: false,
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });

// const { Client } = require('pg')
// const client = new Client()

// await client.connect()

// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()


// starting our Express app
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


