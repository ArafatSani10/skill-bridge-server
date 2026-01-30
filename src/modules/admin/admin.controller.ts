import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await AdminService.getAllUsers();
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await AdminService.toggleUserStatus(id, status);
        res.status(200).json({
            success: true,
            message: `User is now ${status}`,
            data: result
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await AdminService.getAllBookings();

        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookings found in the system at the moment.",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "All bookings retrieved successfully for admin.",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching bookings.",
            error: error.message
        });
    }
};

export const AdminController = { getAllUsers, updateUserStatus, getAllBookings };