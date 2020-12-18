const { checkOrder } = require('./controller.checkOrder')
const { checkIn } = require('./controller.checkIn')
const { checkOut } = require('./controller.checkOut')

exports.checks = { checkOrder, checkIn, checkOut }
