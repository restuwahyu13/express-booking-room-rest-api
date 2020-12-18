const knex = require('../../databases')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SG_SECRET)
const { hashPassword } = require('../../utils/util.encrypt')
const { encodedJwt } = require('../../utils/util.jwt')
const { tempMailRegister } = require('../../templates/template.register')

exports.registerAccount = async (req, res, next) => {
	const { email, password } = req.body
	const users = await knex('users').where({ email: email }).select('email')

	if (users.length > 0) {
		return res.status(409).json({
			status: res.statusCode,
			method: req.method,
			message: 'Users already exists'
		})
	}

	const saveUsers = await knex('users').insert({
		email,
		password: hashPassword(password),
		photo: req.photo,
		created_at: new Date()
	})

	if (saveUsers.rowCount < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Registered new account failed'
		})
	}

	const tokenActivation = encodedJwt({ email }, { expiresIn: '5m' })
	const messageMail = tempMailRegister(email, tokenActivation)

	sendgridMail.send(messageMail, (err, response) => {
		if (err) return next(err)

		if (response[0].statusCode === 202) {
			return res.status(201).json({
				status: res.statusCode,
				method: req.method,
				message: 'Registered new account successfuly'
			})
		}
	})
}
