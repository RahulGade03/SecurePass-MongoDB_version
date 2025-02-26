const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
const Data = require("./schema/data.js");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.6ezji.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use(cors())
app.use(express.json())

app.get('/getData', async (req, res) => {
    const data = await Data.find();
    res.json (await data.json());
})

app.post ('/editOne', async (req, res) => {
    try {
        const result = await Data.deleteOne({ _id: req.body.id })
        res.send("Data Updated!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post ('/deleteOne', async (req, res) => {
    try {
        const result = await Data.deleteOne({ _id: req.body.id });
        res.send("Data Deleted!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post ('/saveOne', async (req, res) => {
    try{
        const data1 = await Data.create({
            website: req.body.website,
            username: req.body.username,
            password: req.body.password
        })
        res.json('Saved successfully!')
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})