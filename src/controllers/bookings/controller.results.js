const knex = require('../../databases')

exports.resultsBookings = async (req, res) => {
	const bookings = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.join('rooms', 'bookings.room_id', 'rooms.room_id')
		.select([
			'bookings.order_id',
			'bookings.user_id',
			'bookings.room_id',
			'bookings.total_person',
			'bookings.booking_time',
			'bookings.noted',
			'users.email',
			'users.photo as photoUsers',
			'users.active',
			'rooms.room_name',
			'rooms.room_capacity',
			'rooms.photo as photoRooms',
			'rooms.room_status'
		])

	if (bookings.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Data already to use',
		data: bookings
	})
}
