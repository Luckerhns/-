import UserController from "../../api/controllers/User.controller";

import Express from "express";

const router = Express.Router();

router.post("/registration", UserController.registration);
router.post('/login', UserController.login)

export default router;