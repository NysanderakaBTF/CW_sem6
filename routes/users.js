var express = require('express');
const user_controller = require("../controllers/usercontoller");
var router = express.Router();
const asyncHandler = require('express-async-handler')
const authMiddleware = require("../middleware/auth");

/* GET users listing. */
router.post('/register', asyncHandler(user_controller.register));
router.post('/login', asyncHandler(user_controller.login));
router.get('/all', asyncHandler(user_controller.get_all));
router.delete('/:id', authMiddleware, asyncHandler(user_controller.destroy));
router.patch('/:id',authMiddleware, asyncHandler(user_controller.update));
router.get('/:id', asyncHandler(user_controller.get_one));
router.post('/admin/:id',authMiddleware, asyncHandler(user_controller.make_admin));


module.exports = router;
