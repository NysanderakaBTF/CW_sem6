const User = require("../models/user");
const createHttpError = require("http-errors");
const {Contest, ContestPhotoModel} = require("../models/contest");

async function create_contest(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id');
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }

    const {name, description, startDate, endDate} = req.body;
    const today = new Date;
    const contest = await Contest.create({
        name, description, startDate, endDate, organizator: req.user._id
    })
    res.json({contest})

}

async function participate_in_contest(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!req.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {id} = req.params;
    const contest = await Contest.findOne({_id:id}).exec();
    let user_in_contest = false;
    for (let i = 0; i < contest.participants.length; i++) {
        if(contest.participants[i] == user_1._id){
            user_in_contest = true;
            break
        }
    }
    if(!user_in_contest){
        contest.participants.push(user_1._id);
        await contest.save();
        res.json({contest});
        return
    }else {
        next(createHttpError(400, 'You are alremady participating'))
        return
    }
}

async function addPhotoToContest(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {id} = req.params;

    const{photo_id} = req.body;

    const contest = await Contest.findOne({_id:id}).exec();
    let users_count = 0;
    for (const photo of contest.photos){
        if(photo.user_id === user_1._id){
            users_count++;
        }
    }
    if(users_count>=2){
        next(createHttpError(400, 'You have reached limit of 2 photos per contest'))
        return
    }
    else{
        contest.photos.push({photo_id, user_id: user_1._id, rating:0})
        await contest.save();
        res.json({contest})
    }
}

async function remove_photo_from_contest (req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {id, photo_id} = req.params;

    const contest = await Contest.findOne({_id:id}).exec();
    contest.photos.id(photo_id).deleteOne();
    await contest.save();
    res.json({contest})

}

async function deleteContest(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {id} = req.params;

    const{photo_id} = req.body;

    const contest = await Contest.findOne({_id:id}).exec();
    if(user_1._id != contest.organizator && user_1.role == 'USER'){
        next(createHttpError(403));
        return
    }
    await Contest.deleteOne({_id:id});
    res.status(204);
    res.json({})
}

async function update(req,res,next){
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {id} = req.params;

    const contest = await Contest.findOne({_id:id}).exec();
    if(user_1._id != contest.organizator && user_1.role == 'USER'){
        next(createHttpError(403));
        return
    }

    const updated_contest = await Contest.findOneAndUpdate(
        {_id:contest.id}, {
            name: req.body.name,
            description:req.body.description,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
        }, {new: true}
    ).exec();
    res.json({updated_contest});
}


async function rate_photo(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {contestId, photo_id} = req.params;
    const contest = await Contest.findById(contestId).exec();
    if (!contest) {
        next(createHttpError(404));
    }
    // Filter unrated photos for the given contest
    const onePhoto = contest.photos.id(photo_id);
    onePhoto.rated_by.push(user_1._id);
    onePhoto.rating += 1;
    // await onePhoto.save();
    await contest.save();
    res.json({contest})
}

async function get_unrated_photos(req, res, next) {

    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {contestId} = req.params;



    const contest = await Contest.findById(contestId).exec();
    if (!contest) {
        next(createHttpError(404));
    }
    // Filter unrated photos for the given contest
    const unratedPhotos = contest.photos.filter(photo =>
        !photo.rated_by.includes(user_1._id)
    );

    res.json({unratedPhotos})
}

async function get_my_photos(req, res, next) {
    const user_1 = await User.findOne({_id: req.user._id}, 'role name created_at _id').exec();
    if(!re1.user || !user_1){
        next(createHttpError(422));
        return;
    }
    const {contestId} = req.params;
    const contest = await Contest.findById(contestId).exec();
    if (!contest) {
        next(createHttpError(404));
    }
    // Filter unrated photos for the given contest
    const my_photos = contest.photos.filter(photo =>
        photo.user_id == req.user.id
    );
    res.json({my_photos});

}

async function get_contest(req, res, next) {
    const {id} = req.params;
    const contest = await Contest.findById(id).exec();
    res.json({contest});
}
async function get_all_contests(req, res, next) {
    const contests = await Contest.find({});
    res.json({contests})
}
module.exports = {create_contest,
    participate_in_contest,
    addPhotoToContest,
    remove_photo_from_contest,
    deleteContest,
    update,
    get_unrated_photos,
    rate_photo,
    get_my_photos,
    get_all_contests
}
