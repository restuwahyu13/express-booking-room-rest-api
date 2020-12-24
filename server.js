const app = require('./src/app')
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
server.listen(port, () => console.log(`server is running on port ${server.address().port}`))
