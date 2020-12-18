const express = require('express')
const router = express.Router()
const { rooms } = require('../controllers/rooms')
const { fileUpload } = require('../utils/util.upload')
const roleMiddleware = require('../middlewares/middleware.role')
const authMiddleware = require('../middlewares/middleware.auth')

router.post('/rooms', [roleMiddleware, fileUpload.fields([{ name: 'photo' }])], rooms.createRooms)
router.get('/rooms', authMiddleware, rooms.resultsRooms)
router.get('/rooms/:id', authMiddleware, rooms.resultRooms)
router.delete('/rooms/:id', roleMiddleware, rooms.deleteRooms)
router.put('/rooms/:id', roleMiddleware, fileUpload.fields([{ name: 'photo' }]), rooms.updateRooms)

module.exports = router
