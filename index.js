const express = require('express')
const app = express()
var mongoose =require("mongoose")
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path')
app.use ('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json({limit: '2mb', extended: true}))
app.use(express.urlencoded({limit: '2mb', extended: true}))


mongoose.connect(process.env.DB)

.then(() => console.log("MongoDB is connected"))
.catch(err =>console.log(err))


var indexRouter = require('./routes');
app.use('/api/v1', indexRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})