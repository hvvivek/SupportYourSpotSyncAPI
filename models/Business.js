var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var BusinessSchema = new mongoose.Schema(
    {
        name                : String,
        city                : {type: Schema.Types.ObjectId, ref: 'CitiesModel'},
        neighborhood        : String,
        user_rating         : Number,
        num_ratings         : Number,
        email_contact       : String,
        busines_url         : String,
        image_url           : String,
        image_attribution   : String,
        gift_card_url       : String,
        place_type          : String,
        address             : String,
        addedBy             : String,
        synced_by           : {type: Schema.Types.ObjectId, ref: 'AdminsModel', required: true}
    },
    {
      timestamps: true
    }
)

var BusinessesModel = new mongoose.model('BusinessesModel', BusinessSchema)
module.exports = BusinessesModel