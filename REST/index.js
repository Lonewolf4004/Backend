const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        username : "Zaib",
        content : "I love coding"
    },
    {
        username : "Adam",
        content : "For the man you want to become you have to forget the man you currently are."
    },
    {
        username : "Eve",
        content : "I got my first internship"
    }
];

app.get("/posts", (req, res) => {
    res.send("Servers working well");
});

app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
});