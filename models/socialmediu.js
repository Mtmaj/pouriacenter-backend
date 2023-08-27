const mongoose = require("mongoose")

const SocialMediuSchema = mongoose.Schema(
    {
        logo_id : Number,
        url : String
    }
)

module.exports.SocialMediuSchema = SocialMediuSchema