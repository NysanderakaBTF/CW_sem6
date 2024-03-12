const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: Schema.Types.String,
    text: Schema.Types.String,
    createdAt: Schema.Types.Date,
    updatedAt: Schema.Types.Date,
    tags: [String]
})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post}
