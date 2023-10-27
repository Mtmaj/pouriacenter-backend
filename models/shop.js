const mongoose = require("mongoose")
const { SocialMediuSchema } = require("./socialmediu")

const ShopSchema = mongoose.Schema(
    {
        name : String,
        logo : String,
        category : String,
        floor : Number,
        tags : [String],
        images : [String],
        description : String,
        address : String,
        is_brand : Boolean,
        social_media : String
    }
)

const ShopModel = mongoose.model("Shop",ShopSchema)

module.exports.ShopModel = ShopModel