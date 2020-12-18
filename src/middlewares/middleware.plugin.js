const zlib = require('zlib')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { bookingTimeCronjob } = require('./middleware.cronjob')

module.exports = (app) => {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(
		compression({
			level: 9,
			strategy: zlib.constants.Z_RLE
		})
	)
	app.use(helmet({ contentSecurityPolicy: false }))
	app.use(cors())
	app.use(bookingTimeCronjob())
	if (process.env.NODE_ENV !== 'production') {
		require('dotenv/config')
	//	app.use(morgan('dev'))
	}
}
