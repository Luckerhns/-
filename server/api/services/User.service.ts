import ModelException from "../errors/ModelException";
import ErrorException from "../errors/ErrorException";
import { User } from "../models/User";

export default class UserService {
  static async createUser(userData) {
    try {
      const candidate = await User.findOne({
        where: { email: userData.email },
      });

      if (candidate) {
        throw new ModelException(409, "User already exists");
      }

      const user = await User.create(userData);
      if (!user) {
        throw new ModelException("User could not be created");
      }

      return user;
    } catch (error) {
      throw ErrorException(`Error while creating new user : ${error}`);
    }
  }

  static async getUser(body) {
    try {
      const user = await User.findOne({
        firstname: body.firstname,
        lastname: body.lastname,
        patronymic: body.patronymic,
      });
      if (!user) {
        throw ModelException(404, "User not found");
      }

      return user;
    } catch (error) {
      throw ErrorException(`Error while getting user : ${error}`);
    }
  }

  static async getAllUsersByGroup(body) {
    try {
      const users = await User.findAll(body.group);
      if (!users) {
        throw ModelException(404, "This group doenst exist");
      }
      if (!users) {
        throw ModelException(404, "Users not found");
      }
    } catch {
      throw ErrorException(`Error while getting users group : ${error}`);
    }
  }
}
