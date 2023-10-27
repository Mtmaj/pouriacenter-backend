const mongoose = require("mongoose")
const config = require("config")

class DataBase{
    port = config.get("db.port");
    url = config.get("db.host");
    db = config.get("db.name");
    connect() {
        mongoose.connect(this.url).then(()=>{
            console.log("DataBase Connected Successful ")
        }).catch((e)=>{
            console.log(`DataBase Connected Has this Error : ${e}`)
        })
    }
}

module.exports.DataBase = DataBase