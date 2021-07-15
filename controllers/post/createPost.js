const Post = require("../../models/Post");

const createPost = async (req, res) => {    
    try {
        let post = {
            user: req.tokenData.userId,
            content: req.body.content,
            time: req.body.time,
        }
        post = await Post.create(post);
        post = await post.populate('user').execPopulate();
        res.status(201).json({ post });      
    } catch (error) {
        console.log(err);
        res.status(404).json({ success: false })
    }
}

module.exports = createPost;