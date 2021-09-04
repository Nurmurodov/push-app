const express = require('express');
const notificationController = require('./../controllers/notificationController')
const authController = require('./../controllers/authController')

const router = express.Router();

router.use(authController.protect,authController.restrictTo('admin'))

router.get('/:text/:id',notificationController.senNotification)

module.exports = router;