const express = require("express")
const { AboutUs } = require("../api/v1/aboutus/index")
const { AdminMessage } = require("../api/v1/admin_messages/index")
const { ContactUS } = require("../api/v1/contactus/index")
const route = express.Router()

route.use("/aboutus",AboutUs)
route.use("/admin-message",AdminMessage)
route.use("/contactus",ContactUS)

module.exports.Route = route