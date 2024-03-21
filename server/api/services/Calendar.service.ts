import ErrorException from "../errors/ErrorException";
import { Calendar } from "../models/Calendar";

const calendarTemplate = `[
  {
    "date": "2023-01-11",
    "lessons": ["Физ-ра","Физ-ра","","Физ-ра","Физ-ра"],
    "homework": ["Сделать дз", "", "", "", "Решить уравнение"],
    "rating": [{}]
  }
]`;

export default class CalendarService {
  static async createCalendar(groupId) {
    try {
      const calendar = await Calendar.create({
        groupId: groupId,
        calendar: calendarTemplate,
      });
      return calendar;
    } catch (error) {
      throw new ErrorException(
        500,
        `Ошибка при создании календаря ${error.message}`
      );
    }
  }
  static async getCalendar(groupId) {
    try {
      const calendar = await Calendar.findOne({ where: { groupId: groupId } });

      return calendar;
    } catch (error) {
      throw new ErrorException(
        500,
        `Ошибка при поиске календаря ${error.message}`
      );
    }
  }
}

// date: "2023-01-11",
