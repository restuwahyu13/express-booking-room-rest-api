const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('<h1>Welcome To Booking Room Rest API</h1>')
})

module.exports = router
