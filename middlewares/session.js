
const shortId = require('shortid');

const Session = require('../models/Session');

module.exports = async function(req, res, next) {

    const sessionId = shortId.generate();
	if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, 
        { 
            expires: new Date(Date.now() + 900000000), 
            signed: true
        })

        Session.create({ sessionId: sessionId });
    }
    
    const session = await Session.findOne({ sessionId: req.signedCookies.sessionId});
    let totalCount = 0;
    let cartItems
    if(session) {
        cartItems = session.cart;
    }

    for(var i in cartItems) {
        totalCount += cartItems[i];
    }
    res.locals.totalCount = totalCount;
	next();
}