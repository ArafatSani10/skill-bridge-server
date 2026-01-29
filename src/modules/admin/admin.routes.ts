import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { AdminController } from "./admin.controller";


const router = express.Router();

router.get(
    "/users",
    auth(UserRole.ADMIN),
    AdminController.getAllUsers
);

export const AdminRoutes: Router = router;