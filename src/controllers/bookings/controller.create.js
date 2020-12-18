const knex = require('../../databases')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SG_SECRET)
const { tempMailBooking } = require('../../templates/template.booking')
const { orderId } = require('../../utils/util.orderId')

exports.createBookings = async (req, res, next) => {
	const { user_id, room_id, total_person, booking_time, noted } = req.body
	const findRoom = await knex('rooms').where({ room_id: room_id }).select(['room_capacity', 'room_status'])
	const findUser = await knex('users').where({ user_id }).select('email')

	if (findUser.length < 1 || findRoom.length < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'user_id/room_id not found or deleted from owner'
		})
	}

	if (total_person >= findRoom[0].room_capacity) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: `Maximum capacity must be under ${findRoom[0].room_capacity}`
		})
	}

	if (findRoom[0].room_status === 'booked') {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Room already booked, please contact customer service for more information'
		})
	}

	const orderBooking = await knex('bookings').insert(
		{
			order_id: orderId(),
			user_id,
			room_id,
			total_person,
			booking_time,
			noted,
			created_at: new Date()
		},
		'order_id'
	)

	if (orderBooking.rowCount < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Order booking room failed'
		})
	}

	const messageMail = tempMailBooking(orderBooking[0], findUser[0].email)
	sendgridMail.send(messageMail, async (err, response) => {
		if (err) return next(err)
		if (response[0].statusCode === 202) {
			await knex('rooms').where({ room_id: room_id }).update({ room_status: 'booked', updated_at: new Date() })
			return res.status(201).json({
				status: res.statusCode,
				method: req.method,
				message: 'Order booking room successfuly, please check your email'
			})
		}
	})
}
