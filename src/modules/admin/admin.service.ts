import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true
        }
    });
};

const toggleUserStatus = async (userId: string, status: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { status }
    });
};


const getAllBookings = async () => {
    return await prisma.booking.findMany({
        include: {
            student: {
                select: {
                    name: true,
                    email: true
                }
            },
            tutor: {
                select: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            slot: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};


export const AdminService = { getAllUsers, toggleUserStatus, getAllBookings };