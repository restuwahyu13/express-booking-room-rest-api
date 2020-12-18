const knex = require('../../databases')

exports.createRooms = async (req, res) => {
	const { room_name, room_capacity } = req.body
	const rooms = await knex('rooms').where({ room_name: room_name }).select('room_name')

	if (rooms.length > 0) {
		return res.status(409).json({
			status: res.statusCode,
			method: req.method,
			message: 'Room name already exists'
		})
	}

	const saveRoom = await knex('rooms').insert({
		room_name,
		room_capacity,
		photo: req.photo,
		created_at: new Date()
	})

	if (saveRoom.rowCount < 0) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Failed to created room'
		})
	}

	return res.status(201).json({
		status: res.statusCode,
		method: req.method,
		message: 'Successfuly to created room'
	})
}
