import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const studentId = req.user!.id;
        const { tutorId, slotId } = req.body;

        const result = await BookingService.createBooking(studentId, tutorId, slotId);

        res.status(201).json({
            success: true,
            message: "Booking confirmed successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMyBookings = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const role = req.user!.role;
        const result = await BookingService.getMyBookings(userId, role);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const BookingController = { createBooking, getMyBookings };