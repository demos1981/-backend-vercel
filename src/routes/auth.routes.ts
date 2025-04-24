import express, { Router } from "express";
import * as AuthController from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/token", AuthController.token);
router.delete("/logout", AuthController.logout);

export default router;
