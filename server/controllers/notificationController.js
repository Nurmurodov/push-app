const catchAsync = require('./../utils/catchAsync');
const push = require('web-push')
const User = require('./../models/userModel')

const { PUBLIC_KEY, PRIVATE_KEY } = process.env;

exports.senNotification = catchAsync(async (req,res,next) => {
  const user = await User.findById(req.params.id)


  push.setVapidDetails('mailto:example@yourdomain.org',PUBLIC_KEY,PRIVATE_KEY)

  let sub = {
    endpoint: user.endpoint,
    expirationTime:null,
    keys:{
      p256dh: user.keys.p256dh,
      auth: user.keys.auth
    }
  }

  push.sendNotification(sub,req.params.text)

  res.status(200).json({
    message: 'success',
    data: user
  })
})