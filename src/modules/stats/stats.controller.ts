import { Request, Response } from "express";
import { StatsService } from "./stats.service";

const getStudentStats = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const result = await StatsService.getStudentStats(userId);

        res.status(200).json({
            success: true,
            message: "Student statistics retrieved successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const StatsController = {
    getStudentStats
}