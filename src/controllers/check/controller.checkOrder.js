const knex = require('../../databases')

exports.checkOrder = async (req, res) => {
	const booking = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.join('rooms', 'bookings.room_id', 'rooms.room_id')
		.where({ 'bookings.order_id': req.query.order_id })
		.select([
			'bookings.order_id',
			'bookings.total_person',
			'bookings.booking_time',
			'users.email',
			'rooms.room_name',
			'rooms.room_capacity',
			'rooms.photo as photoRoom',
			'rooms.room_status'
		])

	if (booking.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Detail booking information is not exists'
		})
	}

	booking.forEach((value) => {
		const { order_id, total_person, booking_time, email, room_name, room_capacity, photoRoom, room_status } = value

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: 'Your detail booking order information',
			data: {
				detailOrder: { order_id, total_person, booking_time, email, room_name, photoRoom, room_status, room_capacity }
			}
		})
	})
}
