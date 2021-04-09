var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ImageSchema = new Schema({
    title:          { type: String },
    description:    { type: String },
    filename:       { type: String },
    mimetype:       { type: String },
    originalname:   { type: String },
    views:          { type: Number, 'default': 0 },
    likes:          { type: Number, 'default': 0 },
    timestamp:      { type: Date, 'default': Date.now }
});

ImageSchema.virtual('uniqueId')
    .get(function() {
        return this.filename;
    });

mongoose.model('Image', ImageSchema);
