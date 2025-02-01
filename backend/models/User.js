const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age:      { type: Number, required: true },
    nativeLanguage: { 
        type: String, 
        enum: ['Hindi', 'English', 'Marathi', 'Other'],
        required: true 
    },
    learningLanguage: { 
        type: String, 
        enum: ['Hindi', 'English', 'Marathi', 'Other'],
        required: true 
    },
    speciallyAbled: { 
        type: Boolean, 
        default: false,
        required: true 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;