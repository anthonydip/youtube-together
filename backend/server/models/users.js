import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: string,
        required: true,
    },
    password: {
        type: string,
        required: true,
    },
});

const User = model('user', userSchema);

export default User;