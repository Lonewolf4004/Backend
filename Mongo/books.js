const mongoose = require('mongoose');

main()
.then(() => {
    console.log(`Connection successfull`);
})
.catch(err => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 20,
    },
    author : {
        type : String,
    },
    price : {
        type : Number,
        min : [1, "Price is too low for amazon selling"],
    },
    discount : {
        type : Number,
        default : 0,
    },
    category : {
        type : String,
        enum : ["fiction", "non-fiction"],
    },
    genre : [String],
});

const Book = mongoose.model("Book", bookSchema);


Book.findByIdAndUpdate('689edcb7384f1c8a63f1e6f0', {price : -500}, {runValidators : true})
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err.errors.price.properties.message);
})


// const book1 = new Book ({
//     title : "Marvel Comics v2",
//     price : 500,
//     genre : ["Comics", "Superhero", "Marvel"],
// });

// book1.save()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });