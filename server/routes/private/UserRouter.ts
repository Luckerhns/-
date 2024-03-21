import UserController from "../../api/controllers/User.controller";

import Express from "express";
import checkRoleMiddleware from "../../api/middlewares/checkRoleMiddleware";

const router = Express.Router();

router.post("/get-users-by-group", checkRoleMiddleware("isAdmin"), UserController.getAllUsersByGroup);
router.post('/get-group-calendar', checkRoleMiddleware("isAdmin"), UserController.getGroupCalendar);

export default router;