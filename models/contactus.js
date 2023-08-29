const mongoose = require("mongoose")
const { SocialMediuSchema } = require("./socialmediu")

const ContactUsSchema = mongoose.Schema(
    {
        phone_numbers : [String],
        address : String,
        location_link : String,
        social_media : [SocialMediuSchema]
    }
)

const ContactUsModel = mongoose.model("Contactus",ContactUsSchema)

module.exports.ContactUsModel = ContactUsModel