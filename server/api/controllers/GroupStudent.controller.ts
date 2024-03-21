import ModelException from "../errors/ModelException";
import { Group } from "../models/Group";
import { Student } from "../models/Student";
import GroupService from "../services/Group.service";
import UserService from "../services/User.service";

export default class GroupStudentController {
  static async addStudent(req, res, next) {
    try {
      const studentInfo = req.body.studentInfo;
      const groupInfo = req.body.groupInfo;
      const student = await UserService.getUser(studentInfo);

      if (!student) {
        throw new ModelException(404, "Такой студент не найден");
      }

      const group = await GroupService.getGroup(groupInfo.group);

      //@ts-ignore
      const groupId = group.dataValues.id;

      const newStudent = await student.update({ groupId: groupId, groupName: groupInfo.group });

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
  static async deleteStudent(req, res, next) {
    try {
      const studentInfo = req.body.studentInfo;
      const groupInfo = req.body.groupInfo;

      const student = await UserService.getUser(studentInfo);

      if (!student) {
        throw new ModelException(404, "Такой студент не найден");
      }

      const group = await GroupService.getGroup(groupInfo.group);

      //@ts-ignore
      const groupId = group.dataValues.id;

      const newStudent = await student.update({ groupId: null, groupName: "" });

      //@ts-ignore
      const updatedGroup = await GroupService.getGroup(groupInfo.group);

      return res.json(updatedGroup);
    } catch (error) {
      next(error.message);
    }
  }
}
