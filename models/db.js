const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/imgUploader', {useMongoClient: true})

mongoose.connection.on('open', function() {
    console.log('mongodb opened.')
})

require('./image')
