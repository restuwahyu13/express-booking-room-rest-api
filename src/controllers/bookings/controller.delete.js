const knex = require('../../databases')

exports.deleteBookings = async (req, res) => {
	const findBooking = await knex('bookings').where({ booking_id: req.params.id }).select()

	if (findBooking.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Booking item is not exists or deleted from owner'
		})
	}

	await knex('rooms')
		.where({ room_id: findBooking[0].room_id })
		.update({ room_status: 'ready', updated_at: new Date() })

	const deleteBooking = await knex('bookings').where({ booking_id: req.params.id }).delete()

	if (deleteBooking < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Booking item failed to deleted'
		})
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Booking item success to deleted'
	})
}
