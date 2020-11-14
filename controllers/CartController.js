
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
        let record = db.get('sessions')
        .find({id: req.signedCookies.sessionId})
        .value();
        let totalCount = 0;
        let cartItems = record.cart;

        for(var i in cartItems) {
            totalCount += cartItems[i];
        }
        
        res.json(totalCount);
    }
}

module.exports = new CartController;
