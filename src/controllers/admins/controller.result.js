const knex = require('../../databases')

exports.resultAdmin = async (req, res) => {
	const user = await knex('users').where({ user_id: req.params.id }).select()

	if (user.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Data already to use',
		data: user
	})
}
