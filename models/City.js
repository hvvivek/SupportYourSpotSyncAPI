var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CitySchema = new mongoose.Schema(
    {
        name: {type: String, unique: true, index: true},
        slug: {type: String, unique: true},
        coordinates: {type: Schema.Types.ObjectId, ref: 'PointsModel'}
    },
    {
      timestamps: true
    }
)

var CitiesModel = new mongoose.model('CitiesModel', CitySchema)
module.exports = CitiesModel