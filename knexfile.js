const { resolve } = require('path')

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.PG_HOST,
			user: process.env.PG_USERNAME,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB
		},
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
		client: 'pg',
		connection: process.env.PG_URI,
		compress: true,
		pool: { min: 1, max: 10 },
		migrations: {
			directory: resolve(process.cwd(), 'src/databases/migrations')
		}
	}
}
