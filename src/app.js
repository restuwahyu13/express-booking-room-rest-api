const express = require('express')
const app = express()
require('./middlewares/middleware.plugin')(app)
require('./middlewares/middleware.route')(app)

module.exports = app
