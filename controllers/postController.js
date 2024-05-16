const {Post} = require('../models/post')
const User = require("../models/user");
const createHttpError = require("http-errors");
const {Photo} = require("../models/photos");

async function createPost(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    if( !req.user ){
        next(createHttpError(403));
        return;
    }

    const date = Date
    try {
        const post = await Post.create({
            userId: user_1._id,
            title: req.body.title,
            text: req.body.text,
            createdAt: date.now(),
            updatedAt: date.now(),
            tags: req.body.tags
        })
        res.status(200).json({post})
    } catch {
        next(createHttpError(400));
    }
    // console.log(post);



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
    try {
        await Post.deleteOne({_id: post._id});
        res.status(204);
        res.json({})
    } catch{
        next(createHttpError(400));
    }

}


async function findPost(req, res, next) {
    try {
        let post = await Post.find(req.body.filter).limit(req.body.limit).skip(req.body.skip).exec();
        let posts_ids = post.map(obj => obj.id);
        let post_images = await Photo.find({post_id: {$in: posts_ids}})
        let postsWithImages = post.map(post => {
            const a = post_images.filter(img => img.post_id.toString() == post._id)
            return {...post._doc, images: a};
        });

        res.json(postsWithImages);
    } catch (err) {
        next(createHttpError(400));
    }
}

module.exports = {delete_post, createPost, findPost}