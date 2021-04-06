const router = require('koa-router')()
const uploader = require('../uploader')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const util = require('util')

const rename = util.promisify(fs.rename)

router.prefix('/images')

const Image = mongoose.model('Image')

router.post('/', uploader.single('file'), async function (ctx, next) {
    let file = ctx.req.file
    let diskFilename = file.filename + path.extname(file.originalname)
    await rename(file.path, path.dirname(file.path) + '/' + diskFilename)
        .then(() => Image.create({
            title: ctx.req.body.title,
            description: ctx.req.body.description,
            filename: diskFilename,
            mimetype: ctx.req.file.mimetype,
            originalname: ctx.req.file.originalname
        }))
        .then(doc => ctx.redirect(`/images/${doc.id}`))
        .catch(err => ctx.throw(500, err))
})

router.get('/:id', async ctx => {
    await Image.findById(ctx.params.id)
    .then(image => ctx.render('image', {image, comments:[]}))
})

module.exports = router
