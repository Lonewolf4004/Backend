const mongoose = require('mongoose');

main()
.then(() => {
    console.log(`Connection successfull`);
})
.catch(err => 
    console.log(err)
);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  age : Number,
});

const User = mongoose.model("User", userSchema);

User.deleteMany({age : {$gt : 40}})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
});


// User.findOneAndUpdate({name : "Bruce"}, {age : 42}, {new : true})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.findByIdAndUpdate('689ec7f8d1fdaed12604c67c', { name : "Batman"}, {new : true})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.insertMany([
//   {name : "Tony", email : "tony@gmail.com", age : 46},
//   {name : "Peter", email : "peter@gmail.com", age : 36},
//   {name : "Bruce", email : "bruce@gmail.com", age : 56},
// ])
// .then((res) => {
//   console.log(res);
// });


// const user1 = new User({
//   name : "Zaib",
//   email : "Zaib23@gmail.com",
//   age : 19,
// });
// const user2 = new User({
//   name : "Adam smasher",
//   email : "Adam23@gmail.com",
//   age : 67,
// });

// user2.save()
// .then( (res) => {
//   console.log(res);
// })
// .catch( (err) => {
//   console.log(err);
// });
