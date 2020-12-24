const { resolve } = require('path')

module.exports = {
	development: {
		client: 'pg',
		connection: process.env.PG_URI,
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
		compress: true,
		migrations: {
			directory: resolve(process.cwd(), 'src/databases/migrations')
		}
	}
}
