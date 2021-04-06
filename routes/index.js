const router = require('koa-router')()
const mongoose = require('mongoose')
const stats = require('../helpers/stats')

const Image = mongoose.model('Image')

router.get('/', async (ctx, next) => {
    await Promise.all([
        Image.find().sort({timestamp: -1}),
        stats()
    ])
    .then(([images, stats]) => ctx.render('index', {images, stats}))
    .catch(err => ctx.throw(500, err))
})

module.exports = router
