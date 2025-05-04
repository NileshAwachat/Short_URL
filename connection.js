const mongoose = require('mongoose')

async function connectionToMongooDB(url) {
 return mongoose.connect(url)   
}

module.exports = {connectionToMongooDB}