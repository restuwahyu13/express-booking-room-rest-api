require('dotenv/config')
const { resolve } = require('path')

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.PG_HOST,
			user: process.env.PG_USERNAME,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DATABASE,
			port: process.env.PG_PORT
		},
		compress: true,
		pool: { min: 1, max: 10 },
		migrations: {
			directory: resolve(process.cwd(), 'src/databases/migrations')
		},
		seeds: {
			directory: resolve(process.cwd(), 'src/databases/seeds')
		},
		log: {
			error: (msg) => console.log(msg),
			warn: (msg) => console.log(msg)
		}
	},
	production: {
		client: 'mysql',
		connection: {
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			port: process.env.MYSQL_PORT
		},
		compress: true,
		migrations: {
			directory: resolve(process.cwd(), 'src/databases/migrations')
		}
	}
}
