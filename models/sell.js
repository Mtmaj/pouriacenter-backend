const mongoose = require("mongoose")

const SellSchema = mongoose.Schema(
    {
        name : String,
        images : String,
        tags : [Strings],
        feature : [String],
        price : Number,
        date : Date,
        status : Boolean
    }
)

const SellModel = mongoose.model("Rent",SellSchema)

module.exports.SellModel = SellModel