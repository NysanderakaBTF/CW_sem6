var express = require('express');
const contest_controller = require("../controllers/contestsController");
var router = express.Router();
const asyncHandler = require('express-async-handler')
const authMiddleware = require("../middleware/auth");

/* GET users listing. */
router.post('/create',authMiddleware, asyncHandler(contest_controller.create_contest));
router.post('/participate/:id', authMiddleware, asyncHandler(contest_controller.participate_in_contest));
router.post('/add/:id',authMiddleware, asyncHandler(contest_controller.addPhotoToContest));
router.delete('/remove/:id/:photo_id', authMiddleware, asyncHandler(contest_controller.remove_photo_from_contest));
router.delete('/delete/:id', authMiddleware, asyncHandler(contest_controller.deleteContest))
router.patch('/:id',authMiddleware, asyncHandler(contest_controller.update));
router.post('/rate/:contestId/:photo_id', authMiddleware, asyncHandler(contest_controller.rate_photo))
router.get('/photos/my/:contestId', authMiddleware, asyncHandler(contest_controller.get_my_photos))
router.get('/photos/:contestId', authMiddleware, asyncHandler(contest_controller.get_unrated_photos))
module.exports = router;
