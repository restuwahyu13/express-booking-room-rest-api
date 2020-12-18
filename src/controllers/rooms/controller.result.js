const knex = require('../../databases')

exports.resultRooms = async (req, res) => {
	const room = await knex('rooms').where({ room_id: req.params.id }).select()

	if (room.length < 1) {
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
		data: room
	})
}
