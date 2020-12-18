const knex = require('../databases')
const { decodedJwt } = require('../utils/util.jwt')
const { message } = require('../utils/util.message')

module.exports = async (req, res, next) => {
	const tokenHeader = req.headers.authorization

	if (!tokenHeader) {
		await message({
			response: res,
			statusCode: 401,
			method: req.method,
			message: 'Unauthorization access token is required'
		})
	}

	try {
		const { email } = decodedJwt(tokenHeader.split('Bearer ')[1])
		const findUser = await knex('users').where({ email: email }).select()
		if (findUser.length > 0) {
			req.users = findUser[0]
			return next()
		}
	} catch (err) {
		await message({
			response: res,
			statusCode: 401,
			method: req.method,
			message: 'Unauthorization access token expired'
		})
	}
}
