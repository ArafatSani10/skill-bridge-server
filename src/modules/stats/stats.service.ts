import { prisma } from "../../lib/prisma";

const getStudentStats = async (studentId: string) => {
    const [totalBookings, pendingBookings, completedBookings] = await Promise.all([
        prisma.booking.count({ where: { studentId } }),
        prisma.booking.count({ where: { studentId, status: "PENDING" } }),
        prisma.booking.count({ where: { studentId, status: "COMPLETED" } })
    ]);

    return { totalBookings, pendingBookings, completedBookings };
};

export const StatsService = {
    getStudentStats
}