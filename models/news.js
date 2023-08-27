const mongoose = require("mongoose")

const NewsSchema = mongoose.Schema(
    {
        title : String,
        date : Date,
        code : Number,
        images : [String],
        text1 : String,
        text2 : String
    }
)

const NewsModel = mongoose.model("New",NewsSchema)

module.exports.NewsModel = NewsModel