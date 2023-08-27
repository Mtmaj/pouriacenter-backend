const mongoose = require("mongoose")
const { SocialMediuSchema } = require("./socialmediu")

const ServicesSchema = mongoose.Schema(
    {
        name : String,
        logo : String,
        description : String,
        phone_number : String,
        address : String,
        social_media : [SocialMediuSchema]
    }
)

const ServicesModel = mongoose.model("Service",ServicesSchema)

module.exports.ServicesModel = ServicesModel
