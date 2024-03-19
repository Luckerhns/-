import { Student } from "../models/Student";
import UserService from "../services/User.service";

export default class UserController {
  static async createUser(req, res, next) {
    try {
      const body = req.body;
      const User = await UserService.createUser(body);

      return res.json(User);
    } catch (error) {
      next(error.message);
    }
  }

  static async getUser(req, res, next) {
    try {
      const body = req.body;
      const User = await UserService.getUser(body);

      return res.json(User);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsersByGroup(req, res, next) {
    const body = req.body

    const Users = await UserService.getAllUsersByGroup(body);
  }
}
