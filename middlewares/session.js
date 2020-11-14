
const shortId = require('shortid');

const db = require('../db');

module.exports = function(req, res, next) {

    const sessionId = shortId.generate();
	if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, { expires: new Date(Date.now() + 90000000), signed: true})
        db.get('sessions').push({
            id: sessionId
        }).write();
    }
    
    let record = db.get('sessions')
        .find({id: req.signedCookies.sessionId})
        .value();
    let totalCount = 0;
    let cartItems
    if(record) {
        cartItems = record.cart;
    }

    for(var i in cartItems) {
        totalCount += cartItems[i];
    }
    res.locals.totalCount = totalCount;
	next();
}