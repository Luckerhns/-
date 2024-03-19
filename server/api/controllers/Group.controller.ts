import ModelException from "../errors/ModelException";
import { Group } from "../models/Group";
import { Student } from "../models/Student";
import GroupService from "../services/Group.service";
import UserService from "../services/User.service";

export default class GroupController {
  static async createGroup(req, res, next) {
    try {
      const body = req.body;
      const Group = await GroupService.createGroup(body);

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

  static async addStudent(req, res, next) {
    try {
      const studentInfo = req.body.studentInfo;
      const groupInfo = req.body.groupInfo;
      const student = await UserService.getUser(studentInfo);

      if (!student) {
        throw new ModelException(404, "Student not found");
      }

      const group = await GroupService.getGroup(groupInfo.group);

      //@ts-ignore
      const groupId = group.dataValues.id;

      const newStudent = await student.update({ groupId: groupId });

      const newStudentInfo = await Student.findOne({
        where: { email: newStudent.dataValues.email },
        include: [{ model: Group }],
      });
      //@ts-ignore

      return res.json({ newStudent, newStudentInfo });
    } catch (error) {
      next(error.message);
    }
  }

  static async getGroup(req, res, next) {
    try {
      const groupName = req.body;
      const group = await GroupService.getGroup(groupName);

      return res.json(group);
    } catch (error) {
      next(error.message);
    }
  }
  static async deleteStudent(req, res, next) {
    try {
    } catch (error) {
      next(error.message);
    }
  }
}
