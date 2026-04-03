const Post = require("../models/postsModels");

exports.getPosts = async (req, res) => {
    const { page } = req.query;
    const postsPerPage = 10;

    try {
        const pageNum = parseInt(page) > 1 ? parseInt(page) - 1 : 0;

        const result = await Post.find().sort({ createdAt: -1 }).skip(pageNum * postsPerPage).limit(postsPerPage)
            .populate({
                path: 'userId',
                select: 'email'
            });

        res.status(200).json({success: true,message: "posts",data: result});

    } catch (error) {
        res.status(401).json({success: false,message: error.message});
    }
};