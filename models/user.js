const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    created_at: Date,
    updated_at: Date,
    role:{
        type: String,
        enum:['ADMIN', 'USER']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User
