const express = require('express')
const router = express.Router()
const { bookings } = require('../controllers/bookings')
const roleMiddleware = require('../middlewares/middleware.role')
const authMiddleware = require('../middlewares/middleware.auth')

router.post('/bookings', authMiddleware, bookings.createBookings)
router.get('/bookings', roleMiddleware, bookings.resultsBookings)
router.get('/bookings/:id', authMiddleware, bookings.resultBookings)
router.delete('/bookings/:id', roleMiddleware, bookings.deleteBookings)
router.put('/bookings/:id', roleMiddleware, bookings.updateBookings)

module.exports = router
