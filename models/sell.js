const mongoose = require("mongoose")

const SellSchema = mongoose.Schema(
    {
        name : String,
        images : [String],
        tags : [String],
        feature : [String],
        meterage : Number,
        price : String,
        date : {type: Date, default: Date.now},
        address : String,
        status : Boolean
    }
)

const SellModel = mongoose.model("Sell",SellSchema)

module.exports.SellModel = SellModel