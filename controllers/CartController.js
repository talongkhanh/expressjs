
const db= require('../db');

class CartController {

    addToCart(req, res) {
        const productId = req.params.id;
        const SID = req.signedCookies.sessionId;
        let count = db.get('sessions')
            .find({id: SID})
            .get('cart.' + productId, 0);
        db.get('sessions')
        .find({ id: SID })
        .set('cart.' + productId, count + 1)
        .write();
        let cartItems = db.get('sessions')
        .find({id: req.signedCookies.sessionId})
        .value()
        .cart;
        let items = [];
        let counts = [];
        for(var i in cartItems) {
            items.push(db.get('products').find({id: i}).value());
            counts.push(cartItems[i]);
        }
        let totalCount= counts.reduce((a, b) => a + b, 0);
        res.json({items, counts, totalCount});
    }

    showCart(req, res) {
        res.render('cart');
    }
}

module.exports = new CartController;
