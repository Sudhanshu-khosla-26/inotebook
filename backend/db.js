const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


const connecToMongo = ()=>{
    mongoose.connect(mongoURL)
}

module.exports = connecToMongo;