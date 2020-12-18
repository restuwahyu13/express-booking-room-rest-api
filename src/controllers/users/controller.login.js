const knex = require('../../databases')
const { verifyPassword } = require('../../utils/util.encrypt')
const { encodedJwt } = require('../../utils/util.jwt')

exports.loginAccount = async (req, res) => {
	const { email, password } = req.body
	const users = await knex('users').where({ email: email }).select('*')

	if (users.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Users account is not exists, please register'
		})
	}

	if (users[0].active == false) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Users account is not active, please resend token'
		})
	}

	verifyPassword(password, users[0].password, (error, success) => {
		if (error) {
			return res.status(500).json({
				status: res.statusCode,
				method: req.method,
				message: 'Internal server error'
			})
		}

		if (!success) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: 'Username/Password is wrong'
			})
		}

		const accessToken = encodedJwt({ email }, { expiresIn: '1d' })
		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: 'Login successfuly',
			access_token: accessToken
		})
	})
}
