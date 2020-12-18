const knex = require('../../databases')
const { decodedJwt } = require('../../utils/util.jwt')

exports.activationAccount = async (req, res) => {
	try {
		const decoded = decodedJwt(req.params.id, process.env.JWT_SECRET)
		const users = await knex('users').where({ email: decoded.email }).select('*')
		const activationSuccess = await knex('users').where({ user_id: users[0].user_id }).update({ active: true })

		if (activationSuccess == true) {
			return res.status(400).json({
				status: res.statusCode,
				method: req.method,
				message: 'Users account is not active, please resend token'
			})
		}

		return res.status(200).json({
			status: res.statusCode,
			method: req.method,
			message: 'Users account hash been active, please login'
		})
	} catch (err) {
		return res.status(401).json({
			status: res.statusCode,
			method: req.method,
			message: 'Unauthorization activation token expired'
		})
	}
}
