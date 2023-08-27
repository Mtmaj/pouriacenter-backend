const mongoose = require("mongoose")

const AboutUsSchema = mongoose.Schema(
    {
        title1 : String,
        text1 : String,
        image1 : String,
        title2 : String,
        text2 : String,
        image2 : String,
        title3 : String,
        texts : [String],
        images_slider : [String]
    }
)

const AboutUsModel = mongoose.model("Aboutus",AboutUsSchema)

module.exports.AboutUsModel = AboutUsModel