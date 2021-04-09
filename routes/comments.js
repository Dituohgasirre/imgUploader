const router = require('koa-router')()
const mongoose = require('mongoose')

const Comment = mongoose.model('Comment')

router.post('/', async ctx => {
    await Comment.create({...ctx.request.body, image: ctx.params,imageid})
    .then(doc => ctx.body = doc)
    .catch(err => ctx.throw(500, err))
})

module.exports = router
