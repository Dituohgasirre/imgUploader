const mongoose = require('mongoose')

const Image = mongoose.model('Image')

const stats = () =>
    Image.aggregate([
        {$group: {
            _id: 'total',
            images: {$sum: 1},
            views: {$sum: '$views'},
            likes: {$sum: '$likes'}
            }
        }
    ])
    .then(arr => ({
        images: arr[0].images,
        views: arr[0].views,
        likes: arr[0].likes,
        comments: 0
    }))

module.exports = stats
