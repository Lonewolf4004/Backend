const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main()
.then(() => {
    console.log("Connection successfull");
})
.catch( (err) =>{
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Index route
app.get("/chats", asyncWrap (async (req, res, next) => {
        let chats = await Chat.find();
        res.render("index.ejs", {chats});
}));

//New route
app.get("/chats/new", (req, res)=> {
    res.render("new.ejs");
});

//Create route
app.post("/chats",  asyncWrap  (async (req, res, next)=> {
        let {from, to, message} = req.body;
        let newChat = new Chat({
            from : from,
            to : to,
            message : message,
            created_at : new Date(),
        });
         await newChat.save()
        // .then((res)=>{
        //     console.log("Chat was saved!");
        // })
        // .catch((err)=>{
        //     console.log(err);
        // });
        res.redirect("/chats");
}));


function asyncWrap(fn){
    return function(req, res, next){
        fn(req, res, next).catch((err) => next(err));
    }
}


// New : SHOW route
app.get("/chats/:id", asyncWrap ( async (req, res, next)=>{
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
             next(new ExpressError(505, "Chat not found"));
        }
        res.render("edit.ejs", {chat});
}));

// Edit route
app.get("/chats/:id/edit", asyncWrap (async (req, res, next) => {
        let { id } = req.params;
        let chat =  await Chat.findById(id);
        res.render("edit.ejs", {chat});
}));

//Update route
app.put("/chats/:id", asyncWrap (async (req, res, next)=>{
        let {id} = req.params;
        let { newMessage } = req.body;
        let updatedChat =  await Chat.findByIdAndUpdate(id, {message : newMessage}, {runValidators : true, new : true});
    
        console.log(updatedChat);
    
        res.redirect("/chats");
}));

//Destroy route
app.delete("/chats/:id", asyncWrap (async (req, res)=>{
        let {id} = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
}));

app.get("/", (req,res) => {
    res.send("Root page is working");
});

const handleValidationError = (err) => {
    console.log("This was a validation error please follow the rules");
    console.dir(err.message);
    return err;
}

app.use((err, req, res, next)=>{
    console.log(err.name);
    if(err.name === "ValidationError"){
       err =  handleValidationError(err);
    }
    next(err);
});

// Error handling middleware
app.use((err, req, res, next)=>{
    let { status = 500, message = "Some error occured"} = err;
    res.status(status).send(message);
});

app.listen(port ,() => {
    console.log("Server is listening");
});