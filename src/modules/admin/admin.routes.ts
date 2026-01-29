import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { AdminController } from "./admin.controller";


const router = express.Router();

router.get(
    "/users",
    auth(UserRole.ADMIN),
    AdminController.getAllUsers
);


router.patch(
    "/users/:id/status",
    auth(UserRole.ADMIN),
    AdminController.updateUserStatus);

export const AdminRoutes: Router = router;