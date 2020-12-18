const express = require('express')
const router = express.Router()
const { users } = require('../controllers/users')
const { fileUpload } = require('../utils/util.upload')

router.post('/users/register', fileUpload.fields([{ name: 'photo' }]), users.registerAccount)
router.post('/users/login', users.loginAccount)
router.get('/users/activation/:id', users.activationAccount)
router.post('/users/resend', users.resendTokenAccount)

module.exports = router
