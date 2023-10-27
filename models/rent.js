const mongoose = require("mongoose")

const RentSchema = mongoose.Schema(
    {
        name : String,
        images : [String],
        tags : [String],
        feature : [String],
        meterage : Number,
        mortgage_price : String,
        rent_price : String,
        date : {type: Date, default: Date.now},
        status : Boolean,
        address : String
    }
)

const RentModel = mongoose.model("Rents",RentSchema)

module.exports.RentModel = RentModel