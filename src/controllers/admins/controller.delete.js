const knex = require('../../databases')
const { existsSync, unlink } = require('fs')
const { resolve } = require('path')

exports.deleteAdmins = async (req, res, next) => {
	const findUser = await knex('users').where({ user_id: req.params.id }).select()

	if (findUser.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const checkPhoto = existsSync(resolve(process.cwd(), `src/images/${findUser[0].photo}`))
	const deleteUser = await knex('users').where({ user_id: req.params.id }).delete()

	if (deleteUser < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Admins account failed to deleted'
		})
	}

	if (checkPhoto && deleteUser == 1) {
		unlink(resolve(process.cwd(), `src/images/${findUser[0].photo}`), (err) => {
			if (err) return next(err)
			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: 'Admins account success to deleted'
			})
		})
	}
}
