const multer = require('multer')
const { resolve } = require('path')
const { existsSync, unlink } = require('fs')

const diskStorage = multer.diskStorage({
	destination: (req, file, done) => {
		if (!file) return done(new Error('Upload file error'), null)

		const fileExits = existsSync(resolve(process.cwd(), `src/images/${file.originalname}`))
		if (!fileExits) return done(null, resolve(process.cwd(), 'src/images'))

		unlink(resolve(process.cwd(), `src/images/${file.originalname}`), (error) => {
			if (error) return done(error)
			return done(null, resolve(process.cwd(), 'src/images'))
		})
	},
	filename: (req, file, done) => {
		if (file) {
			const extFile = file.originalname.replace('.', '')
			const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile)
			if (!extPattern) return done(new TypeError('File format is not valid'), null)
			req.photo = file.originalname
			return done(null, file.originalname)
		}
	}
})

const fileUpload = multer({ storage: diskStorage, limits: 1000000 })

module.exports = { fileUpload }
