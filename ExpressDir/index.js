const express = require("express");
const app = express();

let port = 8080;

app.listen(port, ()=> {
    console.log(`App is listening on port : ${port}`);
});

app.get("/", (req, res)=> {
    res.send("Hello i am root");
});

app.get("/:username/:id", (req, res)=> {
    let {username, id} = req.params;
    res.send(`Welcome to the page ${username} your id is : ${id}`);
});

app.get("/search", (req, res) => {
    let { q } = req.query;
    if(!q) {
        res.send("Nothing was searched");
    }
    res.send(`Search result for query : ${q}`);
});

// app.use((req, res) => {
//     console.log("Request received");
//     res.send({
//         name : "Apple",
//         color : "Red"
//     });
// });