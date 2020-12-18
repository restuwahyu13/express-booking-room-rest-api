const knex = require('../../databases')

exports.resultsRooms = async (req, res) => {
	const rooms = await knex('rooms').select()

	if (rooms.length < 1) {
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
		data: rooms
	})
}
