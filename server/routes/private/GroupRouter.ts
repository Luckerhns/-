import GroupController from "../../api/controllers/Group.controller";

import Express from "express";

const router = Express.Router();

router.post("/create-group", GroupController.createGroup);
router.post("/delete-group", GroupController.deleteGroup);
router.post("/add-student-to-group", GroupController.addStudent);
router.post("/delete-student-from-group", GroupController.deleteStudent);

export default router;
