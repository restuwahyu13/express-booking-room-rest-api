const knex = require('../../databases')
const { hashPassword } = require('../../utils/util.encrypt')

exports.createAdmins = async (req, res) => {
	const { email, password } = req.body
	const users = await knex('users').where({ email: email }).select('email')

	if (users.length > 0) {
		return res.status(409).json({
			status: res.statusCode,
			method: req.method,
			message: 'Admins account already exists'
		})
	}

	const saveUsers = await knex('users').insert({
		email,
		password: hashPassword(password),
		photo: req.photo,
		role: 'admins',
		active: true,
		created_at: new Date()
	})

	if (saveUsers.rowCount < 0) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Registered new account failed'
		})
	}

	return res.status(201).json({
		status: res.statusCode,
		method: req.method,
		message: 'Registered new account successfuly'
	})
}
