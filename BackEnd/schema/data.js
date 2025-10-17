import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
    website: String,
    username: String,
    password: String
})

const Data = mongoose.model('Data', dataSchema);
export default Data;