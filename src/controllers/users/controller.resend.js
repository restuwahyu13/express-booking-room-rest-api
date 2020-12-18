const knex = require('../../databases')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SG_SECRET)
const { encodedJwt } = require('../../utils/util.jwt')
const { tempMailResend } = require('../../templates/template.resend')

exports.resendTokenAccount = async (req, res, next) => {
	const { email } = req.body
	const users = await knex('users').where({ email: email }).select('*')

	if (users.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Users account is not exists, please register'
		})
	}

	if (users[0].active == true) {
		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: 'Users account hash been active, please login'
		})
	}

	const tokenActivation = encodedJwt({ email }, { expiresIn: '5m' })
	const messageMail = tempMailResend(email, tokenActivation)

	sendgridMail.send(messageMail, (err, response) => {
		if (err) return next(err)

		if (response[0].statusCode === 202) {
			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: 'Resend new activation token successfuly, please check your email'
			})
		}
	})
}
