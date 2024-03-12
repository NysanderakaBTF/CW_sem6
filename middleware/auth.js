const {verify} = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");
const createError = require("http-errors");
module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        var token = ''
        try {
            token = req.headers.authorization.split(' ')[1]
        } catch (err) {
            next(createError(422))
            return;
        }
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = verify(token, process.env.SECRET_KEY)
        const user_id = decoded.id
        req.user = await User.findOne({_id: user_id}, 'email name role _id').exec();
        next()
    } catch (err) {
        next(createError(err))
    }
};