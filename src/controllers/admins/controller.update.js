const knex = require('../../databases')
const { hashPassword } = require('../../utils/util.encrypt')

exports.updateAdmins = async (req, res) => {
	const { email, password } = req.body
	const users = await knex('users').where({ user_id: req.params.id }).select()

	if (users.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const updateUser = await knex('users')
		.where({ user_id: req.params.id })
		.update({
			email,
			password: hashPassword(password),
			photo: req.photo,
			updated_at: new Date()
		})

	if (updateUser < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Admins account failed to updated'
		})
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Admins account success to updated'
	})
}
