const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestPhotoSchema = new Schema({
    photo_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    rating: Number,
    rated_by: [Schema.Types.ObjectId]
})

const ContestPhotoModel = mongoose.model('ContestPhoto', ContestPhotoSchema);

const ContestSchema = new Schema({
    name: String,
    description:String,
    startDate:Date,
    endDate:Date,
    organizator: Schema.Types.ObjectId,
    participants:[Schema.Types.ObjectId],
    photos:[ContestPhotoSchema]
})

const Contest = mongoose.model('Contest', ContestSchema);


module.exports = {Contest, ContestPhotoModel}