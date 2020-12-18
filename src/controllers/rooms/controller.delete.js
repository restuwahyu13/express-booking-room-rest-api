const knex = require('../../databases')
const { existsSync, unlink } = require('fs')
const { resolve } = require('path')

exports.deleteRooms = async (req, res, next) => {
	const findRoom = await knex('rooms').where({ room_id: req.params.id }).select()

	if (findRoom.length < 1) {
		return res.status(404).json({
			status: res.statusCode,
			method: req.method,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const checkPhoto = existsSync(resolve(process.cwd(), `src/images/${findRoom[0].photo}`))
	const deleteRoom = await knex('rooms').where({ room_id: req.params.id }).delete()

	if (deleteRoom < 1) {
		return res.status(400).json({
			status: res.statusCode,
			method: req.method,
			message: 'Room failed to deleted'
		})
	}

	if (checkPhoto && deleteRoom == 1) {
		unlink(resolve(process.cwd(), `src/images/${findRoom[0].photo}`), (err) => {
			if (err) return next(err)
			return res.status(200).json({
				status: res.statusCode,
				method: req.method,
				message: 'Room success to deleted'
			})
		})
	}
}
