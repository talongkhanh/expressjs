
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema(
    {
        sessionId: String,
        cart: Object
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Session', Session);
