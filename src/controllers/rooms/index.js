const { createRooms } = require('./controller.create')
const { resultsRooms } = require('./controller.results')
const { resultRooms } = require('./controller.result')
const { deleteRooms } = require('./controller.delete')
const { updateRooms } = require('./controller.update')

exports.rooms = { createRooms, resultsRooms, resultRooms, deleteRooms, updateRooms }
