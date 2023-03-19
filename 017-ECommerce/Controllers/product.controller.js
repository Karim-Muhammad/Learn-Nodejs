const productsModel = require("./../Models/products.model2");

exports.getDetailsProduct = (req, res, next) => {
    const {id} = req.params;
    console.log(id);

    productsModel.getSingleProduct(id).then(product=> {
        // console.log(product)
        res.render("pages/product", {product});
    })
}