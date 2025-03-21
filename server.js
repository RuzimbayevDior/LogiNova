const express = require("express")
const { connectDB } = require("./db/config")
require("dotenv").config()
const cors = require("cors")    
const cookieParser = require("cookie-parser")
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require("./utils/swagger")
const DriverRouter = require("./router/driver.routes")

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(DriverRouter)




connectDB()


const PORT = process.env.PORT || 9000
app.listen(PORT , () => {
  console.log("http://localhost:" + PORT);
  
})