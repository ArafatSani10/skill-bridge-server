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

const updateAvailability = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { slots } = req.body;

        const result = await TutorService.updateAvailability(userId, slots);

        res.status(200).json({
            success: true,
            message: "Availability slots added successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllTutors = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const result = await TutorService.getAllTutors(query);

        res.status(200).json({
            success: true,
            message: "Tutors fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const TutorController = { updateProfile, updateAvailability,getAllTutors };