const mongoose = require('mongoose')

const Image = mongoose.model('Image')

module.exports = () =>
    Image.aggregate().group({
        _id:'total',
        images: {$sum: 1},
        views: {$sum: '$views'},
        likes: {$sum: '$likes'}
    })
    .then(doc =>{
        if (doc.length == 0) {
            return{
                images: 0,
                views: 0,
                likes: 0,
                comments: 0
            }
        }
        return {
            images: doc[0].images,
            views: doc[0].views,
            likes: doc[0].likes,
            comments: 0
        }
    })
