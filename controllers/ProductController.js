
const db= require('../db');

class ProductController {

    show(req, res) {
        const products = db.get('products').value();
        const totalRow = products.length;
        const productsPerPage = 8;
        let page = parseInt(req.query.page) || 1;
        let nextPage = page + 1;
        let prevPage = page - 1;
        const totalPages = Math.ceil(totalRow / productsPerPage);
        if(page <=0) {
            page = 1;
        }
        if(page > totalPages) {
            page = totalPages;
        }
        res.render('products/show', {
            products: products.slice((page - 1)*productsPerPage, page*productsPerPage),
            page: page,
            nextPage: nextPage,
            prevPage: prevPage,
            totalPages: totalPages
        });
    }
}

module.exports = new ProductController;