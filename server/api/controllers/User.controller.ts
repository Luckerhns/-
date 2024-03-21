import { Student } from "../models/Student";
import UserService from "../services/User.service";

export default class UserController {
  static async registration(req, res, next) {
    try {
      const body = req.body;
      const { user, tokens } = await UserService.registration(body);

      return res.json({ user: user, tokens: tokens });
    } catch (error) {
      next(error.message);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, tokens } = await UserService.login(email, password);
      console.log(user);
      return res.json({ user: user, tokens: tokens });
    } catch (error) {
      next(error.message);
    }
  }

  static async getAllUsersByGroup(req, res, next) {
    try {
      const body = req.body;

      // const groupUsers = await UserService.getAllUsersByGroup(body);

      return res.json("groupUsers");
    } catch (error) {
      next(error.message);
    }
  }

  static async getGroupCalendar(req, res, next) {
    try {
      const body = req.body;
    } catch (error) {
      next(error.message);
    }
  }
}
