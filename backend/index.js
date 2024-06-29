const express = require('express')
const morgan = require('morgan')
const router = require('./routers')
const path = require('path')
const favicon = require('serve-favicon')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors(
  {
    origin : [
      // process.env.ALLOWED_UI_LINK
      "https://nebula-lounge-client.vercel.app"
    ],
    methods: ["POST", "GET"],
    credentials: true,
    optionsSuccessStatus : 200
  }
))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(router)

app.get("/", (req, res)=>{
  res.send("halo")
})

app.listen(port, ()=>{
  console.log(`App listening on port ${port}`)
})

