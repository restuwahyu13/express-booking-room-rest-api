const express = require('express')
const router = express.Router()
const { admins } = require('../controllers/admins')
const { fileUpload } = require('../utils/util.upload')
const roleMiddleware = require('../middlewares/middleware.role')

router.post('/admins', [fileUpload.fields([{ name: 'photo' }])], admins.createAdmins)
router.get('/admins', roleMiddleware, admins.resultsAdmin)
router.get('/admins/:id', roleMiddleware, admins.resultAdmin)
router.delete('/admins/:id', roleMiddleware, admins.deleteAdmins)
router.put('/admins/:id', [roleMiddleware, fileUpload.fields([{ name: 'photo' }])], admins.updateAdmins)

module.exports = router
