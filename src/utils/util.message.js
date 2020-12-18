const EventEmitter = require('events')
const events = new EventEmitter()

exports.message = async (rest) => {
	const { response, method, statusCode, message } = rest
	events.once('msg', () => response.status(statusCode).json({ status: statusCode, method, message }))
	return events.emit('msg')
}
