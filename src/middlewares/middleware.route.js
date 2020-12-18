const adminsRouter = require('../routes/route.admins')
const bookingsRouter = require('../routes/route.bookings')
const roomsRouter = require('../routes/route.rooms')
const usersRouter = require('../routes/route.users')
const checkRouter = require('../routes/route.check')
const testingRouter = require('../routes/route.testing')

module.exports = (app) => {
	app.use('/api/v1', adminsRouter)
	app.use('/api/v1', bookingsRouter)
	app.use('/api/v1', roomsRouter)
	app.use('/api/v1', usersRouter)
	app.use('/api/v1', checkRouter)
	app.use(testingRouter)
}
