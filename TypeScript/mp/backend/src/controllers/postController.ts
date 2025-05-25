import { Request, Response } from "express";
import { Post } from "../models/Post.js";
import mongoose from "mongoose";

export const createPost = async (req: Request, res: Response) => {
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
      author: req.user?._id
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
      
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Некорректный ID поста" });
    }
    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    
    // Проверяем, является ли текущий пользователь автором поста
    if (post.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "У вас нет прав на удаление этого поста" });
    }
    
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Пост успешно удален" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}; 