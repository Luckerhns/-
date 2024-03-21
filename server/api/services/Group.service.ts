import { Model } from "sequelize";
import ErrorException from "../errors/ErrorException";
import ModelException from "../errors/ModelException";
import { Group, Student } from "../models/relations";
import CalendarService from "./Calendar.service";

export default class GroupService {
  static async createGroup(body) {
    try {
      const groupName = body.group;
      const candidate = await Group.findOne({ where: { group: groupName } });
      if (candidate) {
        throw new ModelException(409, "Group already exists");
      }

      const group = await Group.create(body);

      return group;
    } catch (error) {
      throw new ErrorException(
        500,
        `Ошибка при создании группы ${error.message}`
      );
    }
  }

  static async deleteGroup(name) {
    try {
      const group = await Group.findOne({ where: { group: name } });

      return group;
    } catch (error) {
      throw new ErrorException(
        500,
        `Ошибка при удалении группы ${error.message}`
      );
    }
  }

  static async getGroup(groupName: string) {
    try {
      const group = await Group.findOne({
        where: { group: groupName },
        include: [Student],
      });
      if (!group) {
        throw new ModelException(404, "Группа не найдена");
      }
      return group;
    } catch (error) {
      throw new ErrorException(
        500,
        `Ошибка при поиске группы ${error.message}`
      );
    }
  }
}
