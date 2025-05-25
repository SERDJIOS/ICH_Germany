import Post from "../models/post.js";

// Создание поста
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      user: req.userId // значение добавляется middleware authenticate
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Ошибка при создании поста: ${error.message}` });
  }
};

// Получение всех постов пользователя
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Ошибка при получении постов: ${error.message}` });
  }
};