const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://sudhanshukhosla123:sudhanshu168@cluster0.0cubxwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connecToMongo = ()=>{
    mongoose.connect(mongoURL)
}

module.exports = connecToMongo;