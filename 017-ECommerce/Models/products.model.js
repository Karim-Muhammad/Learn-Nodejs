// Constants
const DB_NAME = "online-shop";

const {model, Schema} = require('mongoose');
const DoMongo = require('./DoMongo');

const ProductSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
}, {strict: true})

const Products = model("product", ProductSchema);

exports.get_all_products = () => {
    console.log("Products Models")

    DoMongo(DB_NAME, async () => {
        console.log("Product Model: ", Products);

        await Products
        .find({})
        .then(data => {
            console.log("Data : ", data);
            return new Promise.resolve(data);
            // return (data);
        })
        .catch(err=> {
            return new Promise.reject(err);        
            // return (err);        
        });

    });
}