import GroupController from "../../api/controllers/Group.controller";

import Express from "express";
import GroupStudentController from "../../api/controllers/GroupStudent.controller";
import checkRoleMiddleware from "../../api/middlewares/checkRoleMiddleware";

const router = Express.Router();

router.post(
  "/create-group",
  checkRoleMiddleware("ADMIN"),
  GroupController.createGroup
);
router.post(
  "/get-group",
  checkRoleMiddleware("ADMIN"),
  GroupController.getGroup
);
router.post(
  "/delete-group",
  checkRoleMiddleware("ADMIN"),
  GroupController.deleteGroup
);
router.post(
  "/add-student-to-group",
  checkRoleMiddleware("ADMIN"),
  GroupStudentController.addStudent
);
router.post(
  "/delete-student-from-group",
  checkRoleMiddleware("ADMIN"),
  GroupStudentController.deleteStudent
);


export default router;
