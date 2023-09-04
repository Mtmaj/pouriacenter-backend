const mongoose = require("mongoose")

const RentSchema = mongoose.Schema(
    {
        name : String,
        images : [String],
        tags : [String],
        feature : [String],
        meterage : Number,
        mortgage_price : Number,
        rent_price : Number,
        date : {type: Date, default: Date.now},
        status : Boolean,
        address : String
    }
)

const RentModel = mongoose.model("Rents",RentSchema)

module.exports.RentModel = RentModel