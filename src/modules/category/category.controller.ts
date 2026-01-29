import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const { subject } = req.body;

        if (!subject || subject.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Invalid Input: Subject name is required.",
            });
        }

        const result = await CategoryService.createCategory(subject);

        return res.status(201).json({
            success: true,
            message: "Success: New subject category has been added.",
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to create category.",
        });
    }
};

export const CategoryController = {
    createCategory,
};