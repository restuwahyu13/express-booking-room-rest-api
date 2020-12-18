const knex = require('../../databases')

exports.resultBookings = async (req, res) => {
	const booking = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.join('rooms', 'bookings.room_id', 'rooms.room_id')
		.where({ 'bookings.booking_id': req.params.id })
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

	if (booking.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const {
		order_id,
		user_id,
		room_id,
		total_person,
		booking_time,
		noted,
		email,
		photoUsers,
		active,
		room_name,
		room_capacity,
		photoRooms,
		room_status
	} = booking[0]

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Data already to use',
		data: {
			booking: { order_id, user_id, room_id, total_person, booking_time, noted },
			users: { email, photoUsers, active },
			rooms: { room_name, room_capacity, photoRooms, room_status }
		}
	})
}
