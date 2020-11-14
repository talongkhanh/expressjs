
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema(
    {
        name: String,
        author: String,
        image: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Book', Book);
