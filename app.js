const express = require("express")
const cors = require("cors")
const config = require("config")
const { auth } = require("./middlewares/auth")
const database = require("./database/index").DataBase

const app = express()

const my_db = new database()

my_db.connect()

app.use(cors())

app.use(express.json())

app.use(auth)

app.get('/',(req,res)=>{
    return res.json()
})

app.listen(
    config.get('app.port'),
    (e)=>{
        if(!e){
            console.log(`Server Runner in ${config.get('app.port')}`)
        }else{
            console.log("Error port used")
        }
    }
)