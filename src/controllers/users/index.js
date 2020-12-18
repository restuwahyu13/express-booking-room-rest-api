const { registerAccount } = require('./controller.register')
const { activationAccount } = require('./controller.activation')
const { loginAccount } = require('./controller.login')
const { resendTokenAccount } = require('./controller.resend')

exports.users = {
	registerAccount,
	loginAccount,
	activationAccount,
	resendTokenAccount
}
