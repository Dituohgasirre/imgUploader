const router = require('koa-router')()
const mongoose = require('mongoose')

const Image = mongoose.model('Image')

router.get('/', async (ctx, next) => {
    await Image.find().sort({timestamp: -1})
        .then(images => ctx.render('index', {images}))
        .catch(err => ctx.throw(500, err))
})

module.exports = router
