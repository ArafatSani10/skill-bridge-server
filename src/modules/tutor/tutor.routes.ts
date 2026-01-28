import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { TutorController } from "./tutor.controller";

const router = express.Router();

router.put(
    "/profile",
    auth(UserRole.TUTOR),
    TutorController.updateProfile
);

export const TutorRoutes: Router = router;