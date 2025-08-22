const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => {
    console.log(err)
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item : String,
    price : Number,
});

const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref : "Order",
        }
    ],
});

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
    if(customer.orders.length){
       let res = await Order.deleteMany({ _id : {$in : customer.orders}});
       console.log(res)
    }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// FUnctions

const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}

const addCust = async () => {
    let newCust = new Customer({
        name : "Karan Aujla",
    });

    let newOrder = new Order({
        item : "Burger",
        price : 120,
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("Added new customer");
}

const delCust = async () => {
    let data = await Customer.findByIdAndDelete('68a859bac212592c868a6334');
    console.log(data);
}


delCust();