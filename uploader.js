const multer = require('koa-multer')

const uploader = multer({dest: './public/upload/'})

module.exports = uploader
