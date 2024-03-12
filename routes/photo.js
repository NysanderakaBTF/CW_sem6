var express = require('express');
const photo_controller = require("../controllers/photoController");
var router = express.Router();
const asyncHandler = require('express-async-handler')
const authMiddleware = require("../middleware/auth");

/* GET users listing. */
router.post('/upload', authMiddleware, asyncHandler(photo_controller.upload_photo))
router.delete('/delete/:id',authMiddleware, asyncHandler(photo_controller.delete_photo))
router.post('/filter', asyncHandler(photo_controller.filter_photo))

module.exports = router;
