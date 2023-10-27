const mongoose = require("mongoose")

const WorkWithUsSchame = mongoose.Schema(
    {
        full_name : String,
        phone_number : String,
        email : String,
        gender: String,
        madrak : String,
        reshte : String,
        text : String,
        cv_link : String
    }
)

const WorkWithUsModel = mongoose.model("WorkWithUs",WorkWithUsSchame) 

module.exports.WorkWithUsModel = WorkWithUsModel