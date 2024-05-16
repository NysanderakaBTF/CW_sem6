const createError = require("http-errors");
const {Photo} = require("../models/photos")
const User = require("../models/user");
const createHttpError = require("http-errors");
const {Post} = require("../models/post");


async function upload_photo(req, res, next) {
    console.log(req)

    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    if(!req.user || !user_1){
        next(createHttpError(422));
        return;
    }
    let today = Date;
    let post = null;
    if(req.body.post_id){
        post = await Post.findById(req.body.post_id);
        if (!post) {
            next(createHttpError(404));
            return;
        }
        if(!post.userId.equals(req.user._id)){
            next(createHttpError(403));
            return;
        }
    }

    try {
        const img = await Photo.create({
            img: {
                data: Buffer.from(req.files.photo.data).toString('base64'),
                contentType: req.files.photo.mimetype,
            },
            author: user_1._id,
            portfolioNumber: req.body.portfolioNumber,
            price: req.body.price,
            date: today.now(),
            post_id: req.body.post_id,
            title: req.body.title,
            description: req.body.description
        })
        res.status(201).json({img})
    } catch (e) {
        next(createHttpError(400));
        return;
    }
}

async function get_photo(req, res, next) {
    const {id} = req.params
    try {
        const image = await Photo.findById(id).exec();
        if(image)
            res.status(200).json({image})
        else
            next(createHttpError(404));
    } catch (e) {
        next(createHttpError(404));
        return;
    }
}

async function delete_photo(req, res, next) {
    const {id} = req.params
    console.log(id)

    try {
        const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
        if(!req.user || !user_1){
            next(createHttpError(422));
            return;
        }
    } catch {
        next(createHttpError(422));
        return;
    }

    const image = await Photo.findById(id).exec();
    // console.log(id)
    // console.log(image)
    if (!image){
        next(createHttpError(404));
        return;
    }

    if( !req.user || !req.user._id.equals(image.author) && user_1.role == 'USER' ){
        next(createError(403));
        return;
    }
    try {
        await Photo.deleteOne({_id: id})
        res.status(204).json({})
        return;
    } catch {
        next(createHttpError(404));
    }

}

async function filter_photo(req, res, next) {
    try {
        const images = await Photo.find(req.body.filter).limit(req.body.limit).skip(req.body.skip).sort({date:-1}).exec();
        res.json({images})
        return;
    } catch (err) {
        next(createHttpError(400));
    }
}


module.exports = {
    delete_photo, upload_photo, get_photo, filter_photo
}