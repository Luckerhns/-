import Express from "express";
import checkRoleMiddleware from "../../api/middlewares/checkRoleMiddleware";
import AdminController from "../../api/controllers/AdminController";

const router = Express.Router();

router.post(
  "/add-event",
  checkRoleMiddleware("ADMIN"),
  AdminController.createPost
);

router.post(
  "/get-events",
  checkRoleMiddleware("ADMIN"),
  AdminController.getPosts
);

router.post('/delete-event', checkRoleMiddleware("ADMIN"), AdminController.deletePost)

export default router;
