const mongoose = require("mongoose")

const RentSchema = mongoose.Schema(
    {
        name : String,
        images : String,
        tags : [Strings],
        feature : [String],
        mortgage_price : Number,
        rent_price : Number,
        date : Date,
        status : Boolean
    }
)

const RentModel = mongoose.model("Rent",RentSchema)

module.exports.RentModel = RentModel