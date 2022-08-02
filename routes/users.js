import Express from "express";
import * as userController from "../controllers/userController.js";

var router = Express.Router();

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);

export default router;
