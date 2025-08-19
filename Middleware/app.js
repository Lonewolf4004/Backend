const express = require("express");
const app = express();
const port = 8080;


app.use((req, res, next)=>{
    console.log("Hi, i am 1st middleware.");
    next();
    console.log("This is after next()");
});
app.use((req, res, next)=>{
    console.log("Hi, i am 2nd middleware.");
    next();
});

app.get("/", (req, res)=>{
    res.send("Hi, i am root.");
});

app.get("/random", (req, res)=>{
    res.send("This is a random page");
});

app.listen(port, ()=>{
    console.log(`App is listening on port : ${port}`);
});