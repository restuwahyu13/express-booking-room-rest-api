const app = require('./src/app')
const server = require('http').createServer(app)
server.listen(process.env.PORT, () => console.log(`server is running on port ${server.address().port}`))
