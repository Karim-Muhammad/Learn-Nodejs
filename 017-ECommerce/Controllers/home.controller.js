// Constants
const COLLECTION_NAME = 'products';

// Packages
const productsModel = require('../Models/products.model2');

// Functionality
exports.getHome = (req, res, next)=> {
    console.log("Get Home Controller")
    // get products from database
    
    productsModel.get_all_products().then(data=> {
        console.log("then");
        res.render("pages/home.ejs", {products: data});
    }).catch(er=> {
        console.log("catch");
        res.render('pages/home.ejs', {products: []})
    })
    // render home page
}

// exports.filterPHome = (req, res, next) => {
//     console.log("~~~~~~~~~ Filter ~~~~~~~~~")
//     // const {category} = req.query;
//     const {category} = req.body;
//     console.log(category)
//     productsModel.get_all_products().then(products => {
//         const filteredData = products.filter(product=> {
//             return product.category.filter(categ => categ === category).length
//         });
//         // console.log(products, filteredData)
//         res.render("pages/home", {products: filteredData})
//     })
// }

exports.filterByCategory = (req, res, next) => {
    const {category} = req.body;
    productsModel.filterByCategory(category).then(data=> {
        res.render("pages/home", {products: data});
    })
}