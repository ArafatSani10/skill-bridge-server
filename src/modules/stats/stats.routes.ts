import express, { Router } from "express";
import { StatsController } from "./stats.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get(
    "/student-stats",
    auth(UserRole.STUDENT),
    StatsController.getStudentStats
);



export const StatsRoutes: Router = router;