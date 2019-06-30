// Heroku postgres DB
// https://www.heroku.com/postgres

var Pool = require('pg').Pool;

var pool = Pool({
    host: "ec2-54-243-47-196.compute-1.amazonaws.com",
    user: "lhoeoiaeyzlejk",
    password: "53438ab96446a48c4ab814b0799e4dc3eab540c72cc7f6dde277d4de9aec80bf",
    database: "dfalnu8hpsrbnl",
    port: 5432,
    ssl: true
});

pool.connect((err, client, done) => {
    if (err) throw err;

    client.query(`SELECT * FROM pg_catalog.pg_tables`, (err, res) => {
        done();

        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
});