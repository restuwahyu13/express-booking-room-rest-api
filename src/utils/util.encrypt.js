const bcryptjs = require('bcryptjs')

exports.hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

exports.verifyPassword = (password, hashPassword, callback) =>
	bcryptjs.compare(password, hashPassword, (err, success) => callback(err, success))
