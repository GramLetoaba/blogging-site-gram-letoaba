const BlogPost = require('../models/blogpost');
const cloudinary = require('../utils/cloudinary');
const fs = require('node:fs');

exports.createPost = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const post = new BlogPost({
      title,
      subtitle,
      content,
      imageUrl,
      author: req.user.userId,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username email').sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch {
    res.status(500).json({ message: 'Error retrieving post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author?.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not authorized' });

    post.title = title;
    post.subtitle = subtitle;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error('Update post error:', err);
    res.status(500).json({ message: 'Error updating post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author?.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not authorized' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ message: 'Error deleting post' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await BlogPost.findById(req.params.id);

    post.comments.push({ username: req.user.username, text });
    await post.save();

    res.status(200).json(post);
  } catch {
    res.status(500).json({ message: 'Error adding comment' });
  }
};

