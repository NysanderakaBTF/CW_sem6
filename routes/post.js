var express = require('express');
const post_controller = require("../controllers/postController");
var router = express.Router();
const asyncHandler = require('express-async-handler')
const authMiddleware = require("../middleware/auth");

router.post('/create', authMiddleware, asyncHandler(post_controller.createPost))
router.delete('/:id', authMiddleware, asyncHandler(post_controller.delete_post))
router.post('/find', asyncHandler(post_controller.findPost))

module.exports = router;