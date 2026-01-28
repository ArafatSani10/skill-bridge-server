import { Request, Response } from "express";
import { TutorService } from "./tutor.service";
// import { TutorService } from "./tutor.service";

const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found in session"
            });
        }

        const result = await TutorService.createOrUpdateProfile(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Tutor profile updated successfully!",
            data: result
        });
    } catch (error: any) {
        console.error("Tutor Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};

export const TutorController = { updateProfile };