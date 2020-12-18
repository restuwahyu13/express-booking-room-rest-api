const knex = require('../../databases')

exports.updateRooms = async (req, res) => {
	const { room_name, room_capacity, room_status } = req.body
	const rooms = await knex('rooms').where({ room_id: req.params.id }).select()

	if (rooms.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const updateRoom = await knex('rooms').where({ room_id: req.params.id }).update({
		room_name,
		room_capacity,
		photo: req.photo,
		room_status,
		updated_at: new Date()
	})

	if (updateRoom < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Room failed to updated'
		})
	}

	return res.status(200).json({
		status: res.statusCode,
		method: req.method,
		message: 'Room success to updated'
	})
}
