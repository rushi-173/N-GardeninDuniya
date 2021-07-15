const Post = require("../../models/Post");

const createLikeOnPost = async (req, res) => {
    try {
        const postId = req.postId;
        const { userId } = req.tokenData;
        let post = await Post.findById(postId);
        post.likes.push(userId);
        post = await post.save();
        post = await post.populate({
            path: 'likes',
            select: 'name username',
            model: 'User'
        })
            .populate({
                path: 'comments.user',
                select: 'name username',
                model: 'User'
            })
            .populate('user').execPopulate();
        res.status(201).json({ post })        
           
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = createLikeOnPost;