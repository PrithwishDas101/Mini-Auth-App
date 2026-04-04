const { createPostSchema } = require("../middlewares/validator");
const Post = require("../models/postsModels");

exports.getPosts = async (req, res) => {
    const { page } = req.query;
    const postsPerPage = 10;

    try {
        const pageNum = Number(page) > 1 ? Number(page) - 1 : 0;

        const result = await Post.find()
            .sort({ createdAt: -1 })
            .skip(pageNum * postsPerPage)
            .limit(postsPerPage)
            .populate({
                path: 'userId',
                select: 'email'
            });

        return res.status(200).json({ success: true, message: "posts", data: result });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.singlePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate({
            path: 'userId',
            select: 'email'
        });

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({ success: true, message: "single post", data: post });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.createPosts = async (req, res) => {
    const { title, description } = req.body;
    const { userId } = req.user;

    try {
        const { error } = createPostSchema.validate({ title, description });

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await Post.create({
            title,
            description,
            userId
        });

        return res.status(201).json({ success: true, message: 'Post created successfully', data: result });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const { userId } = req.user;

    try {
        const { error } = createPostSchema.validate({ title, description });

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (existingPost.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized to update this post" });
        }

        existingPost.title = title;
        existingPost.description = description;

        await existingPost.save();

        return res.status(200).json({ success: true, message: "Post updated", data: existingPost });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (existingPost.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this post" });
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            success: true, message: "Post deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, message: "Internal server error"
        });
    }
};