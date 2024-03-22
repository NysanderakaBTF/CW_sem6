const createError = require("http-errors");
const User = require("../models/user");
const {getHashedPassword, generateJwt} = require("./authHandler");
const bcrypt = require("bcryptjs")
const e = require("express");

async function register (req, res, next){
        const {email, password, password2, name} = req.body
        if(!email || !password || !password2 || !name){
            next(createError(400, 'Please enter all fields'));
            return;
        }
        if (password !== password2){
            next(createError(400, 'passwords must match'))
            return;
        }

        const candidate = await User.countDocuments({email: email}).exec();
        if (candidate !== 0){
            next(createError(400, 'User with email already exists'))
        }else{
            let today = Date;


            const awesome_instance = new User({
                email, name,
                password: getHashedPassword(password),
                created_at:today.now(),
                updated_at:today.now(),
                role: 'USER' });
            await awesome_instance.save();
            const token = generateJwt (awesome_instance._id, email, awesome_instance.role);
            res.json({token})
        }
}
async function login(req, res, next){
    const {email, password} = req.body;
    const user = await User.findOne({email: email}).exec();
    if (!user){
        next(createError(400, 'No such user'))
        return
    }
    const pass_comp = bcrypt.compareSync(password, user.password);
    if(!pass_comp){next(createError(400, 'Passwords do not match')); return}
    const token = generateJwt(user._id, user.email, user.role)
    return res.json({token})
}

async function get_one(req, res, next) {
    const {id} = req.params
    const user = await User.findOne({_id: id}, 'role name created_at _id email');
    res.json({user})
}

async function get_all(req, res, next) {
    const params = req.query
    const user = await User.find({}, 'role name created_at _id', {limit: params.limit, skip: params.skip}).exec();
    res.json({user})
}

async function update(req, res, next) {
    const {id} = req.params
    const user_1 = await User.findOne({_id: req.user.id}, 'role name created_at _id');


    if( !req.user || req.user.id != id && user_1.role == 'USER' || user_1.role == 'USER' ){
        next(createError(403));
        return;
    }
    const {email, password, name} = req.body
    let today = Date;
    const user = await User.findOneAndUpdate({_id: id}, {
        email, password: getHashedPassword(password), name: name, updated_at: today.now()
    }, {new: true})
    res.json({user})
}

async function destroy(req, res, next) {
    console.log(req)
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    const {id} = req.params
    if( !req.user || req.user.id != id && user_1.role == 'USER' || user_1.role == 'USER' ){
        next(createError(403));
        return;
    }

    await User.deleteOne({_id:id})
    res.status(204)
    res.json({})
}

async function make_admin(req, res, next) {
    const {id} = req.params
    const user_1 = await User.findOne({_id: req.user.id}, 'role name created_at _id');
    if(user_1.role != 'ADMIN' || !req.user){
        next(createError(403));
        return;
    }
    const user = await User.findOneAndUpdate({_id: id}, {role: 'ADMIN'}, {new: true})
    res.json({user})
}
module.exports = {register, login, destroy, get_all, get_one, update, make_admin}