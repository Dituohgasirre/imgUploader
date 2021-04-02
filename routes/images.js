const router = require('koa-router')()
const uploader = require('../uploader')

router.prefix('/images')

router.post('/', uploader.single('file'), function (ctx, next) {
  console.log(ctx.req)
  ctx.body = ctx.req.file
})

module.exports = router
