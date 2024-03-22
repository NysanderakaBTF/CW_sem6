const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const photoSchema = new Schema({
    img: { data: String, contentType: String },
    author: Schema.Types.ObjectId,
    portfolioNumber: Number,
    price: Number,
    date: Date,
    post_id: Schema.Types.ObjectId,
    title: String,
    description: String
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = {Photo}