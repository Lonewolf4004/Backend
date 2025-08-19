const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const port = 8080;


// app.use((req, res, next)=>{
//     console.log("Hi, i am 1st middleware.");
//     next();
// });
// app.use((req, res, next)=>{
//     console.log("Hi, i am 2nd middleware.");
//     next();
// });

app.use("/random", (req, res, next)=>{
    console.log("I am only for random");
    next();
});

const checkToken = (req, res, next)=>{
    let { token } = req.query;
    if( token === "giveaccess"){
        return next();
    } 
    throw new ExpressError(401, "Access denied!");
};


app.get("/err", (req, res)=>{
    abcd= abcd;
});

app.get("/api", checkToken, (req, res)=>{
    res.send("data");
});

app.get("/", (req, res)=>{
    res.send("Hi, i am root.");
});

app.get("/random", (req, res)=>{
    res.send("This is a random page");
});

app.get("/admin", (req, res)=>{
    throw new ExpressError(403, "Access to admin is forbidden");
});


// app.use((req, res, next) =>{
//     req.time= new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });


app.use((err, req, res, next)=>{
   let{ status = 500, message = "Some error occurred" } = err;
    res.status(status).send(message);
});

// app.use((req, res) =>{
//     res.send("Page not found");
// });

app.listen(port, ()=>{
    console.log(`App is listening on port : ${port}`);
});