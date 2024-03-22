import ErrorException from "../errors/ErrorException";
import { Post } from "../models/Post";

export default class AdminController {
  static async createPost(req, res, next) {
    try {
      const { date, work } = req.body;
      console.log(req.body);
      const newPost = Post.create({ date: date, work: work });

      return res.json(newPost);
    } catch (error) {
      throw new ErrorException(500, error.message);
    }
  }

  static async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll();

      return res.json(posts);
    } catch (error) {
      throw new ErrorException(500, error.message);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.body;
      const post = await Post.destroy({ where: { id: id } });

      return res.json(post);
    } catch (error) {
      throw new ErrorException(500, error.message);
    }
  }
}
