const express = require('express');
const authController = require('./../controllers/authController')

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect,authController.restrictTo('admin'))

router.get('/',authController.getUsers)

module.exports = router;