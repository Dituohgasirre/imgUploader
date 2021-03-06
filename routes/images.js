const router = require('koa-router')()
const uploader = require('../uploader')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const util = require('util')
const stats = require('../helpers/stats')
const rename = util.promisify(fs.rename)
const comments = require('./comments')

router.prefix('/images')

const Image = mongoose.model('Image')
const Comment = mongoose.model('Comment')

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
    await Promise.all([
        Image.findById(ctx.params.id),
        stats(),
        Comment.find({image: ctx.params.id})
    ])
    .then(([image, stats, comments]) => ctx.render('image', {image, stats, comments}))
    .catch(err => ctx.throw(500, err))
})

router.post('/:id/like', async ctx => {
    await Image.findByIdAndUpdate(ctx.params.id, {$inc: {likes: 1}})
    .then(() => Image.findById(ctx.params.id))
    .then(doc => ctx.body = {likes: doc.likes})
    .catch(err => ctx.throw(500, err))
})

router.use('/:imageid/comment', comments.routes(), comments.allowedMethods())

module.exports = router
