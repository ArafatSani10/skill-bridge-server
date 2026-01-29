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

export const AdminService = { getAllUsers, toggleUserStatus };