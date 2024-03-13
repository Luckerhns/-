import UserController from "../../api/controllers/User.controller";

import Express from "express";

const router = Express.Router();

router.post("/create-user", UserController.createUser);
router.post("/get-user", UserController.getUser);
router.post("/get-users-by-group", UserController.getAllUsersByGroup);

export default router;