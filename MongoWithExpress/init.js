// const mongoose = require('mongoose');
// const Chat = require("./models/chats.js");

// main()
// .then(() => {
//     console.log("Connection successfull");
// })
// .catch( (err) =>{
//     console.log(err)
// });

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// let allChats = [
//     {
//         from : "Neha",
//         to : "Priya",
//         message : "Ssend me your notes for the upcoming exam",
//         created_at : new Date(),
//     },
//     {
//         from : "rahul",
//         to : "john",
//         message : "See you next week",
//         created_at : new Date(),
//     },
//     {
//         from : "Adam",
//         to : "eve",
//         message : "How are you doing",
//         created_at : new Date(),
//     },
//     {
//         from : "Doe",
//         to : "Priyanka",
//         message : "Wassup",
//         created_at : new Date(),
//     },
//     {
//         from : "Neha",
//         to : "Priya",
//         message : "Ssend me your notes for the upcoming exam",
//         created_at : new Date(),
//     },
// ];

// Chat.insertMany(allChats);

const mongoose = require('mongoose');
const Chat = require("./models/chats.js");

main()
  .then(async () => {
    console.log("Connection successful");

    let allChats = [
      {
        from: "Neha",
        to: "Priya",
        message: "Send me your notes for the upcoming exam",
        created_at: new Date(),
      },
      {
        from: "Rahul",
        to: "John",
        message: "See you next week",
        created_at: new Date(),
      },
      {
        from: "Adam",
        to: "Eve",
        message: "How are you doing",
        created_at: new Date(),
      },
      {
        from: "Doe",
        to: "Priyanka",
        message: "Wassup",
        created_at: new Date(),
      },
    ];

    await Chat.insertMany(allChats);
    console.log("Chats inserted successfully!");

    mongoose.connection.close(); // close the DB connection
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
