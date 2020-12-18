const knex = require('../../databases')

exports.updateBookings = async (req, res) => {
	const { user_id, room_id, total_person, booking_time, noted } = req.body
	const booking = await knex('bookings').where({ booking_id: req.params.id }).select()

	if (booking.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Booking item is not exists or deleted from owner'
		})
	}

	const updateUser = await knex('bookings').where({ booking_id: req.params.id }).update({
		user_id,
		room_id,
		total_person,
		booking_time,
		noted,
		updated_at: new Date()
	})

	if (updateUser < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Booking item failed to updated'
		})
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Booking item success to updated'
	})
}
