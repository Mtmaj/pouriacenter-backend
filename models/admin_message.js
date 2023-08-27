const mongoose = require("mongoose")

const AdminMessageSchema = mongoose.Schema(
    {
        full_name : String,
        phone_number : String,
        email : String,
        text : String
    }
)

const AdminMessageModel = mongoose.model("AdminMessage",AdminMessageSchema) 

module.exports.AdminMessageModel = AdminMessageModel