const createError = require("http-errors");
const {Photo} = require("../models/photos")
const User = require("../models/user");
const createHttpError = require("http-errors");
const {Post} = require("../models/post");


async function upload_photo(req, res, next) {

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


    const img = await Photo.create({
        img: {
            data: req.files.photo.data,
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
    res.json({img})
}

async function get_photo(req, res, next) {
    const {id} = req.params
    const image = await Photo.findById(id).exec();
    res.json({image})
}

async function delete_photo(req, res, next) {
    const {id} = req.params
    console.log(id)
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    const image = await Photo.findById(id).exec();
    console.log(id)
    console.log(image)
    if (!image){
        next(createHttpError(404));
        return;
    }

    if( !req.user || !req.user._id.equals(image.autor) && user_1.role == 'USER' || user_1.role == 'USER' ){
        next(createError(403));
        return;
    }
    await Photo.deleteOne({_id: id})
    res.status(204).json({})
}

async function filter_photo(req, res, next) {
    console.log(req)
    const aaa = await Photo.find(req.body.filter).exec();
    console.log(aaa)
    const images = await Photo.find(req.body.filter).limit(req.body.limit).skip(req.body.skip).sort({date:-1}).exec();
    console.log(images)

    res.json({images})
}


module.exports = {
    delete_photo, upload_photo, get_photo, filter_photo
}