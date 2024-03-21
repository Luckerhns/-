import ModelException from "../errors/ModelException";
import { Calendar } from "../models/Calendar";
import UserService from "../services/User.service";

export default class TeacherController {
  static async addLessonResult(req, res, next) {
    try {
      const { firstname, lastname, rating, groupId, date, homework } = req.body;
      const student = await UserService.getUser({ firstname, lastname });

      if (!student) {
        next(new ModelException(404, "Такой студент не найден"));
      }

      const calendar = await Calendar.findOne({ where: { groupId: groupId } });

      if (!calendar) {
        next(new ModelException(404, "Такой группы не существует"));
      }

      const updatedRating = JSON.parse(calendar.dataValues.calendar).map(
        (dateJS) => {
          if (dateJS.date === date) {
            dateJS.rating[0][lastname] = rating;
          }
          return dateJS;
        }
      );

      const updatedHomework = updatedRating.map(
        (dateJS) => {
          if (dateJS.date === date) {
            dateJS.homework.push(homework);
          }
          return dateJS;
        }
      );

      calendar.update({ calendar: JSON.stringify(updatedHomework) });

      return res.json({
        updatedHomework: updatedHomework,
        updatedRating: updatedRating,
        calendar,
      });

      return res.json(calendar);
    } catch (error) {
      next(error);
    }
  }
}
