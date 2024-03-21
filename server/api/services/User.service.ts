import ModelException from "../errors/ModelException";
import ErrorException from "../errors/ErrorException";
import { Student } from "../models/Student";
import { hash } from "bcrypt";
import TokenService from "./dependencies/Token.service";
import UserDto from "../dto/user-dto";
import MailService from "./dependencies/Mail.service";
import { v4 } from "uuid";

export default class UserService {
  // REGISTRATION
  static async registration(userData) {
    try {
      const candidate = await Student.findOne({
        where: { email: userData.email },
      });

      if (candidate) {
        throw new ModelException(409, "User already exists");
      }

      const hashPassword = await hash(userData.password, 3);

      const activationLink = await v4();

      // CREATING ADMIN
      if (userData.email.toLowerCase() === "Luckerhackerr@gmail.com".toLowerCase()) {
        const user = await Student.create({
          email: userData.email,
          password: hashPassword,
          firstname: userData.firstname,
          lastname: userData.lastname,
          patronymic: userData.patronymic,
          role: "ADMIN",
        });
        if (!user) {
          throw new ModelException(404, "Пользователь не был зарегистрирован");
        }

        await MailService.sendActivationMail(
          userData.email,
          `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(user);

        const tokens = await TokenService.generateTokens({
          id: user.dataValues.id,
          ...userDto,
        });

        const data = await TokenService.saveToken(
          userDto.id,
          tokens.refreshToken
        );

        return { user: user, tokens: tokens };
      } else {
        // CREATING STUDENT

        const user = await Student.create({
          email: userData.email,
          password: hashPassword,
          firstname: userData.firstname,
          lastname: userData.lastname,
          patronymic: userData.patronymic,
        });
        if (!user) {
          throw new ModelException(404, "Пользователь не был зарегистрирован");
        }

        await MailService.sendActivationMail(
          userData.email,
          `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(user);

        const tokens = await TokenService.generateTokens({
          id: user.dataValues.id,
          ...userDto,
        });

        const data = await TokenService.saveToken(
          userDto.id,
          tokens.refreshToken
        );

        return { user: user, tokens: tokens };
      }
    } catch (error) {
      throw new ErrorException(
        500,
        `Ошибка при регистрации : ${error.message}`
      );
    }
  }

  // LOGIN

  static async login(email, password) {
    try {
      const user = await Student.findOne({ where: { email: email } });

      if (!user) {
        throw new ModelException(404, "Пользователь не найден");
      }

      const userDto = new UserDto(user);

      const tokens = await TokenService.generateTokens({
        id: user.dataValues.id,
        ...userDto,
      });

      const data = await TokenService.saveToken(
        userDto.id,
        tokens.refreshToken
      );

      // console.log(user)

      return { user: user, tokens: tokens };
    } catch (error) {
      throw new ErrorException(500, `Ошибка при входе : ${error.message}`);
    }
  }

  // GET USER
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

  // GET USERS

  static async getAllUsersByGroup(body: any) {
    try {
      const users = await Student.findAll({
        where: { group: body.group },
      });

      if (!users) {
        throw new ModelException(404, "This group doenst exist");
      }
      if (!users) {
        throw new ModelException(404, "Users not found");
      }
    } catch (error) {
      throw new ErrorException(
        403,
        `Error while getting users group : ${error.message}`
      );
    }
  }
}
