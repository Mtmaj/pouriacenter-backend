const express = require("express")
const { NewsModel } = require("../../../models/news")
const app = express.Router()
const { auth_erorr } = require("../../../utils/request_massege")

app.get('/get',async (req,res)=>{
    const News = await NewsModel.find()
    return res.json(News.last())
})

app.post("/add",async (req,res)=>{
    if(req.headers.admin_auth == true){
        let news = new NewsModel({
            ...req.body
        })
        await news.save()
        res.json({
            "status" : "Updated News"
        })
    }else{
        return res.status(401).json(auth_erorr)
    }
})

app.get("/new/get", async (req,res)=> {
    const news_id = await News.findById(req.headers.new_id);
    if(!new_id) 
      return res.status(404)
        .json({
            "msg": "New not found"
        })
    res.json({data: news_id})
})

app.get("/news/getall", async (req,res)=>{
    const pageNumber = req.headers.pageNumber;
    const pageSise = 10;
    const news = await NewsModel.find()
    .skip((pageNumber - 1) * pageSise)
    .limit(pageSise);
    res.json({
        data: news
    })
})

module.exports.News = app