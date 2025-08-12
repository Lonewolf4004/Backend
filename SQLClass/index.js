const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
app.get('/users', (req, res) => {
    let q = `SELECT * FROM user`;
     connection.query(q, (err, users) => {
        if(err) {
            console.log(err);
            res.send("Some error in database");
            return;
        }
        res.render("showUsers.ejs", { users });
    });
});

// Edit route
app.get('/users/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
      connection.query(q, (err, result) => {
        if(err) {
            console.log(err);
            res.send("Some error in database");
            return;
        }
        let user = result[0];
        console.log(result);
        res.render("edit.ejs", { user });
    });
});

// Update(db) route
app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let { password : formPass, username : newusername} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    connection.query(q, (err, result) => {
        if(err) {
            console.log(err);
            res.send("Some error in database");
            return;
        }
        console.log(q);
        let user = result[0];
        if(formPass != user.password){
            res.send("Wrong password");
        } else{
            let q2 = `update user set username = '${newusername}' where id = '${id}'`;
            connection.query(q2, (err, result)=>{
                if(err) throw err;
                res.redirect('/users');
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Port is listening at port : ${port}`);
});


    
