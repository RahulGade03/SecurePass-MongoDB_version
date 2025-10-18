import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongodbConnect from './mongodbConnect.js'
import {encrypt, decrypt} from './cryptoModules.js'
import User from "./schema/User.js"
dotenv.config();
import Data from "./schema/Data.js"

const app = express();
const port = 3000

const allowedOrigins = [
  "http://localhost:5173", // your local frontend (Vite default)
  "https://secure-pass-mongo-db-version.vercel.app" // your deployed frontend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if using cookies/auth
  })
);
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// get all the data stored for the user
app.get('/getData', async (req, res) => {
    const emailId = req.query.emailId;
    let user = await User.findOne({emailId: emailId}).populate('data');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newData = user.data.map((d) => {
        const decryptedPassword = decrypt(d.password);
        return {...d.toObject(), password: decryptedPassword};
    })
    res.json (newData);
})

app.post ('/deleteOne', async (req, res) => {
    try {
        await Data.deleteOne({ _id: req.body.id });
        await User.updateOne(
            { emailId: req.body.loginId },
            { $pull: { data: req.body.id } }
        );
        res.send("Data Deleted!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post ('/saveOne', async (req, res) => {
    try{
        console.log("start");
        const encryptedPassword = encrypt(req.body.password);
        console.log("Encrypted Password: ", encryptedPassword);
        const data = await Data.create({
            website: req.body.website,
            username: req.body.username,
            password: encryptedPassword
        })

        if (!(await User.findOne({emailId: req.body.loginId}))){
            await User.create({
                emailId: req.body.loginId,
                data: []
            })
        }

        await User.updateOne(
            {emailId: req.body.loginId},
            {$push: {data: data._id}}
        )
        res.json('Saved successfully!')
    }
    catch(err){
        console.log("This: ", err.message)
    }
})

mongodbConnect();

// app.listen() never runs on Vercel, because in serverless mode Vercel imports your app directly — it doesn’t execute the listener block. Therefore, always connect to mongodb outside the app.listen() block.

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app;