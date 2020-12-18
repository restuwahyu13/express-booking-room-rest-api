const rootRouter = require('../routes/route.root')
const adminsRouter = require('../routes/route.admins')
const bookingsRouter = require('../routes/route.bookings')
const roomsRouter = require('../routes/route.rooms')
const usersRouter = require('../routes/route.users')
const checkRouter = require('../routes/route.check')

module.exports = (app) => {
	app.use(rootRouter)
	app.use('/api/v1', adminsRouter)
	app.use('/api/v1', bookingsRouter)
	app.use('/api/v1', roomsRouter)
	app.use('/api/v1', usersRouter)
	app.use('/api/v1', checkRouter)
}
