const jwt = require('jsonwebtoken')
const { Base64 } = require('js-base64')

exports.encodedJwt = (data, options) => {
	const token = jwt.sign({ ...data }, process.env.JWT_SECRET, { ...options })
	return Base64.encode(token)
}

exports.decodedJwt = (token) => {
	const decodeToken = Base64.decode(token)
	return jwt.verify(decodeToken, process.env.JWT_SECRET)
}
