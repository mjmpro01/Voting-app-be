import Router from "koa-router";
import { UserController } from "../controllers";
import { validate, jwtValidate } from "../middlewares";

const router = new Router();

// Create new User
router.post(
  "/users",
  validate({
    body: {
      username: {
        type: "string",
        required: true,
      },
      password: {
        type: "password",
        required: true,
      },
    },
  }),
  UserController.postCreateNewUser
);

router.post(
  "/login",
  validate({
    body: {
      username: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
    },
  }),
  UserController.login
);

router.get("/users", UserController.getListUsers);

router.delete("/users/:id", jwtValidate, UserController.deleteUserWithId);
export default router;
