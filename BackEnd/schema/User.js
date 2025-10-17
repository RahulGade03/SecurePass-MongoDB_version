import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    emailId: {type: String, required:true, unique: true},
    data: [{type: mongoose.Schema.Types.ObjectId, ref: 'Data'}]
})

const User = mongoose.model('User', userSchema);
export default User;