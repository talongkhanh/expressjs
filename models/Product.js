
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: String,
        image: String,
        description: String,
        price: Number,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', Product);
