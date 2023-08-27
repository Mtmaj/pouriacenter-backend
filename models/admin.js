const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema({
    username : String,
    password : String,
    auth_token : String
})

const AdminModel = mongoose.model("Admin",AdminSchema)

module.exports.AdminModel = AdminModel