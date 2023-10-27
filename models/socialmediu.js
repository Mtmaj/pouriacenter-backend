const mongoose = require("mongoose")

const SocialMediaSchema = mongoose.Schema(
    {
        logo_id : Number,
        url : String
    }
)

module.exports.SocialMediuSchema = SocialMediaSchema