const express = require("express")
const { AboutUs } = require("../api/v1/aboutus/index")
const { AdminMessage } = require("../api/v1/admin_messages/index")
const { ContactUS } = require("../api/v1/contactus/index")
const { News } = require("../api/v1/news/index")
const { Shop } = require("../api/v1/shops/index")
const route = express.Router()

route.use("/aboutus",AboutUs)
route.use("/admin-message",AdminMessage)
route.use("/contactus",ContactUS)
route.use("/news",News)
route.use("/shops",Shop)

module.exports.Route = route