const { createAdmins } = require('./controller.create')
const { resultsAdmin } = require('./controller.results')
const { resultAdmin } = require('./controller.result')
const { deleteAdmins } = require('./controller.delete')
const { updateAdmins } = require('./controller.update')

exports.admins = { createAdmins, resultsAdmin, resultAdmin, deleteAdmins, updateAdmins }
