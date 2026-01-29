import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { CategoryController } from "./category.controller";

const router = express.Router();




router.post(
    "/create-category",
    auth(UserRole.ADMIN),
    CategoryController.createCategory
);

export const CategoryRoutes: Router = router;