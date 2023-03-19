// Constants
const DB_NAME = "online-shop";
const DB_LINK = `mongodb://127.0.0.1:27017/${DB_NAME}`;

const {model, Schema, default: mongoose} = require('mongoose');

const ProductSchema = new Schema({
    name: String,
    price: Number,
    category: {type: [String, Array]},
    description: String,
    image: String
}, {strict: true})
// when category type was String only, there were sometimes values of properties is Array
// and when i iterate on them, it was given me `undefined`!
// but when i specified String, Array, it is solved!

const Products = model("product", ProductSchema);

exports.get_all_products = () => {
    console.log("Products Models")

    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,      
        })
        .then(()=> {
            return Products.find({})
            
            // what you returned in your `then()`, will be parameter of later `then()`
            // i want return a promise, to control it in Controller File
            // returned data from this promise, i mean

        }).then(products => {
            mongoose.disconnect();
            // console.log(products);
            resolve(products);
        }).catch(er => reject(er));
    })
}
exports.filterByCategory = (category) => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(_=> {
            return Products.find({category})
        }).then(products=> {
            mongoose.disconnect();
            resolve(products);
        }).catch(err => reject(err));
    })
}

exports.getSingleProduct = (id) => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(_=> {
            return Products.findById(id)
        }).then(product => {
            mongoose.disconnect();
            resolve(product)
        }).catch(err=> reject(err));
    })
}