const knex = require('../databases')
const schedule = require('node-schedule')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SG_SECRET)
const { dateFormat } = require('../utils/util.dateFormat')
const { tempMailBookingDate } = require('../templates/template.bookingDate')

exports.bookingTimeCronjob = () => (req, res, next) => {
	const rules = new schedule.RecurrenceRule()
	rules.second = 3600
	rules.tz = 'Asia/Jakarta'
	schedule.scheduleJob(rules, async () => {
		const dateNow = dateFormat(new Date()).format()

		const bookingTime = await knex('bookings')
			.join('users', 'bookings.user_id', 'users.user_id')
			.where({ 'bookings.booking_time': dateNow })
			.select(['bookings.order_id', 'bookings.booking_time', 'users.email'])

		const { order_id, email, booking_time } = bookingTime[0]

		if (bookingTime.length > 0) {
			sendgridMail.send(tempMailBookingDate(order_id, email, booking_time), (err, response) => {
				console.log('cronjob working')
				if (err) return next(err)
				if (response[0].statusCode === 202) return next()
			})
		}
	})
	return next()
}
