import Express from "express";
import UserRouter from "./private/userRouter";
import GroupRouter from "./private/GroupRouter";
import AuthRouter from './public/AuthRouter';
import TeacherRouter from './private/TeacherRouter';

const router = Express.Router();

router.use("/users", UserRouter);
router.use('/auth', AuthRouter)
router.use("/group", GroupRouter);
router.use('/teacher', TeacherRouter)

export default router