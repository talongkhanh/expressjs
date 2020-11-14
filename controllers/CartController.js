
const Session = require('../models/Session');

module.exports.addToCart = async function(req, res) {

    const productId = req.params.id;
    const SID = req.signedCookies.sessionId;
    let document = await Session.findOne({ sessionId: SID });

    let documentObject = document._doc;
    if(!documentObject.cart) {
        documentObject.cart = {}
    }

    let count = 0;
    if(documentObject.cart) {
        for (item in documentObject.cart) {
            if(item == productId) {
                count += documentObject.cart[item];
                break;
            }
        }
    }

    documentObject.cart[productId] = count + 1;

    Session.findByIdAndUpdate({ _id: documentObject._id }, documentObject)
        .then(() => res.json(documentObject));

}

module.exports.showCart = function(req, res) {
    res.render('cart');
}

