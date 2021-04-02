const router = require('koa-router')()
const uploader = require('../uploader')
const mongoose = require('mongoose')

const Image = mongoose.model('Image')

router.prefix('/images')

router.post('/', uploader.single('file'), async function (ctx, next) {
    await Image.create({
        title: ctx.req.body.title,
        description: ctx.req.body.description,
        filename: ctx.req.file.filename,
        originalname: ctx.req.file.originalname,
        mimetype: ctx.req.file.mimetype
    })
    .then(doc => ctx.body = {ok: 1})
    .catch(err => ctx.throw(500, err))
})

module.exports = router
