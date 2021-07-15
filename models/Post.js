const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: 'name username' } },
    content: { type: String },
    time: { type: Date },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: 'name username' } },
        content: { type: String },
        time: { type: Date }
    }]
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;