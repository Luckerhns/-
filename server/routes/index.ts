import Express from "express";
import UserRouter from "./private/userRouter";
import GroupRouter from "./private/GroupRouter";

const router = Express.Router();

router.use("/users", UserRouter);
router.use("/group", GroupRouter);

export default router