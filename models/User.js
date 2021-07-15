const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: ["Can't create without name"] },
    username: { type: String, unique: true, required: ["Can't create without username"] },
    email: { type: String, unique: true, required: ["Can't create without email"] },
    password: { type: String },
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;