const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
const Data = require("./schema/data.js");

mongoose.connect(`${process.env.CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json())

app.get('/getData', async (req, res) => {
    const data = await Data.find({loginId: req.query.loginId});
    // console.log (data);
    res.json (data);
})

app.post ('/editOne', async (req, res) => {
    try {
        await Data.deleteOne({ _id: req.body.id })
        res.send("Data Updated!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post ('/deleteOne', async (req, res) => {
    try {
        await Data.deleteOne({ _id: req.body.id });
        res.send("Data Deleted!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post ('/saveOne', async (req, res) => {
    try{
        await Data.create({
            loginId: req.body.loginId,
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