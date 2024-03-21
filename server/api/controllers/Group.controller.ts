import ErrorException from "../errors/ErrorException";
import ModelException from "../errors/ModelException";
import { Calendar } from "../models/Calendar";
import { Group } from "../models/Group";
import { Student } from "../models/Student";
import CalendarService from "../services/Calendar.service";
import GroupService from "../services/Group.service";
import UserService from "../services/User.service";

export default class GroupController {
  static async createGroup(req, res, next) {
    try {
      const body = req.body;
      const group = await GroupService.createGroup(body);

      // @ts-ignore
      const groupId = group.dataValues.id

      const calendar = await CalendarService.createCalendar(groupId);

      return res.json({ group, calendar });
    } catch (error) {
      next(error.message);
    }
  }

  static async getGroup(req, res, next) {
    try {
      const { group } = req.body;
      const Group = await GroupService.getGroup(group);

      return res.json(Group);
    } catch (error) {
      next(error.message);
    }
  }
  static async deleteGroup(req, res, next) {
    try {
      const name = req.body;
      const group = await GroupService.deleteGroup(name);

      return res.json(group);
    } catch (error) {
      next(error.message);
    }
  }

  static async getGroupCalendar(req, res, next) {
    try {
      const { groupId } = req.body;
      const calendar = await CalendarService.getCalendar(groupId);

      return res.json(calendar)
    } catch (error) {
      next(error.message)
    }
  }
}
