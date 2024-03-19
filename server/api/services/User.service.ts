import ModelException from "../errors/ModelException";
import ErrorException from "../errors/ErrorException";
import { Student } from "../models/Student";

export default class UserService {
  static async createUser(userData) {
    try {
      const candidate = await Student.findOne({
        where: { email: userData.email },
      });

      if (candidate) {
        throw new ModelException(409, "User already exists");
      }

      const user = await Student.create({
        email: userData.email,
        password: userData.password,
      });

      if (!user) {
        throw new ModelException(404, "User could not be created");
      }
      return user;
    } catch (error) {
      throw new ErrorException(
        500,
        `Error while creating new user : ${error.message}`
      );
    }
  }

  static async getUser(body: any) {
    try {
      const user = await Student.findOne({ where: body });

      if (!user) {
        throw new ModelException(404, "User not found");
      }

      return user;
    } catch (error) {
      throw new ErrorException(
        403,
        `Error while getting user : ${error.message}`
      );
    }
  }

  static async getAllUsersByGroup(body) {
    try {
      const users = await Student.findAll(body.group);
      if (!users) {
        throw new ModelException(404, "This group doenst exist");
      }
      if (!users) {
        throw new ModelException(404, "Users not found");
      }
    } catch (error) {
      throw new ErrorException(
        403,
        `Error while getting users group : ${error}`
      );
    }
  }
}
