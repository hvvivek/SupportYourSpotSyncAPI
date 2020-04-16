var mongoose = require('mongoose'),
    Schema = mongoose.Schema

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

var PointsModel = new mongoose.model('PointsModel', PointSchema)
module.exports = PointsModel