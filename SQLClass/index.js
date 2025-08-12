const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : 'Z@ib0406'
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), //  before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password()
    ];
}

// Home page route
app.get('/', (req, res)=>{
    let q = `SELECT COUNT(*) FROM user`;
    connection.query(q, (err, result) => {
        if(err) {
            console.log(err);
            res.send("Some error in database");
            return;
        }
        let count = result[0]['COUNT(*)'];
        res.render("home.ejs", { count });
    });
});

// Show route
app.get('/user', (req, res) => {
    res.send("success ");
});

app.listen(port, () => {
    console.log(`Port is listening at port : ${port}`);
});


    
