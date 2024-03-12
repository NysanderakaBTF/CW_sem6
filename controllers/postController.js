const {Post} = require('../models/post')
const User = require("../models/user");
const createHttpError = require("http-errors");

async function createPost(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    if( !req.user ){
        next(createHttpError(403));
        return;
    }

    const date = Date
    const post = await Post.create({
        userId: user_1._id,
        title: req.body.title,
        text: req.body.text,
        createdAt: date.now(),
        updatedAt: date.now(),
        tags: req.body.tags
    })
    console.log(post);


    res.json({post})
}

async function delete_post(req, res, next){
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    const post = await Post.findById(req.params.id);
    if(!post){
        next(createHttpError(404));
        return;
    }

    if( !req.user ||!req.user._id.equals(post.userId) && user_1.role == 'USER' ){
        next(createHttpError(403));
        return;
    }
    await Post.deleteOne({_id: post._id});
    res.status(204);
    res.json({})
}


async function findPost(req, res, next) {
    const post = await Post.find(req.body.filter).limit(req.body.limit).skip(req.body.skip).exec();
    res.json(post);
}

module.exports = {delete_post, createPost, findPost}