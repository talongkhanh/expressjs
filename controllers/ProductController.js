
const Product = require('../models/Product');

module.exports.show = async function(req, res) {
    const products = await Product.find();
    const totalRow = products.length;
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;
    let nextPage = page + 1;
    let prevPage = page - 1;
    const totalPages = Math.ceil(totalRow / perPage);
    if(page <=0) {
        page = 1;
    }
    if(page > totalPages) {
        page = totalPages;
    }
    res.render('products/show', {
        products: products.slice((page - 1)*perPage, page*perPage),
        page: page,
        nextPage: nextPage,
        prevPage: prevPage,
        totalPages: totalPages
    });
}
