const Post = require("../../models/Post");

const getPostsByUserId = async (req, res) => {
    try {
        const userId = req.query.userId;
        const posts = await Post.find({ user: userId }).sort({ time: 'desc' })
            .populate({
                path: 'likes',
                select: 'name username',
                model: 'User'
            })
            .populate({
                path: 'comments.user',
                select: 'name username',
                model: 'User'
            })
            .populate('user');
        res.status(200).json({ posts })
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = getPostsByUserId;