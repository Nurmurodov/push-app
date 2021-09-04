const push = require('web-push')

let keys = push.generateVAPIDKeys()

console.log(keys)