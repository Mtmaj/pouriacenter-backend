const mongoose = require("mongoose")

const NewsSchema = mongoose.Schema(
    {
        title : String,
        date: {type: Date, default: Date.now},
        code : Number,
        images : [String],
        text1 : String,
        text2 : String,
        is_general : Boolean
    }
)

const NewsModel = mongoose.model("New",NewsSchema)

module.exports.NewsModel = NewsModel