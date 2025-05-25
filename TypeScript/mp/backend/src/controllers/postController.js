import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, body, imageUrl, gifUrl, videoUrl } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "Заголовок и тело обязательны" });
    }
    const post = new Post({
      title,
      body,
      imageUrl,
      gifUrl,
      videoUrl,
      author: req.user._id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    
    // Проверяем, является ли текущий пользователь автором поста
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "У вас нет прав на удаление этого поста" });
    }
    
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Пост успешно удален" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};