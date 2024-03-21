import Express from 'express';
import checkRoleMiddleware from "../../api/middlewares/checkRoleMiddleware";
import TeacherController from '../../api/controllers/Teacher.contoller';
import CalendarService from '../../api/services/Calendar.service';
import GroupController from '../../api/controllers/Group.controller';

const router = Express.Router();

router.post('/add-lesson-result', checkRoleMiddleware('TEACHER'), TeacherController.addLessonResult);

router.post('/get-group-calendar', checkRoleMiddleware('TEACHER'), GroupController.getGroupCalendar);

export default router;
