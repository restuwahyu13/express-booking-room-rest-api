const express = require('express')
const router = express.Router()
const { checks } = require('../controllers/check')
const authMiddleware = require('../middlewares/middleware.auth')

router.get('/check/order', authMiddleware, checks.checkOrder)
router.get('/check/in', authMiddleware, checks.checkIn)
router.get('/check/out', authMiddleware, checks.checkOut)

module.exports = router
