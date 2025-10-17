import mongoose from 'mongoose';

const mongodbConnect = async () => { 
    try {
        await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default mongodbConnect;