const knex = require('../../databases')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SG_SECRET)
const { tempMailCheckOut } = require('../../templates/template.checkOut')
const { dateFormat } = require('../../utils/util.dateFormat')

exports.checkOut = async (req, res, next) => {
	const checkIn = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.where({ 'bookings.order_id': req.query.order_id })
		.select(['bookings.order_id', 'bookings.room_id', 'bookings.check_out_time', 'users.email'])

	const { order_id, room_id, check_out_time, email } = checkIn[0]

	if (checkIn.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Check out room failed order_id is not exists'
		})
	}

	if (check_out_time !== null) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: `You have checked out with no booking ${order_id}`
		})
	}

	sendgridMail.send(tempMailCheckOut(order_id, email, dateFormat(new Date()).format()), async (err, response) => {
		if (err) return next(err)

		await knex('bookings').where({ order_id: order_id }).update({ check_out_time: new Date(), update_at: new Date() })
		await knex('rooms').where({ room_id: room_id }).update({ room_status: 'ready', updated_at: new Date() })

		if (response[0].statusCode === 202) {
			return res.status(201).json({
				status: res.statusCode,
				method: req.method,
				message: 'Check out room successfuly'
			})
		}
	})
}
