const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    loginId: String,
    website: String,
    username: String,
    password: String
})

module.exports = mongoose.model('Data', dataSchema);