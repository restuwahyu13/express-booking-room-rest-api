const { createBookings } = require('./controller.create')
const { resultsBookings } = require('./controller.results')
const { resultBookings } = require('./controller.result')
const { deleteBookings } = require('./controller.delete')
const { updateBookings } = require('./controller.update')

exports.bookings = { createBookings, resultsBookings, resultBookings, deleteBookings, updateBookings }
