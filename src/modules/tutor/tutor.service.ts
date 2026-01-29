import { prisma } from "../../lib/prisma";

const createOrUpdateProfile = async (userId: string, data: any) => {
    return await prisma.tutorProfile.upsert({
        where: { userId: userId },
        update: {
            bio: data.bio,
            pricePerHour: parseFloat(data.pricePerHour),
            experience: parseInt(data.experience),
        },
        create: {
            userId: userId,
            bio: data.bio,
            pricePerHour: parseFloat(data.pricePerHour),
            experience: parseInt(data.experience),
        },
    });
};

const updateAvailability = async (userId: string, slots: { startTime: Date, endTime: Date }[]) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: { userId }
    });

    if (!tutor) throw new Error("Tutor profile not found!");

    const createdSlots = await prisma.availabilitySlot.createMany({
        data: slots.map(slot => ({
            tutorId: tutor.id,
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime),
        }))
    });

    return createdSlots;
};

const getAllTutors = async (query: any) => {
    const { searchTerm, minPrice, maxPrice, sortBy, sortOrder } = query;

    const where: any = {};

    if (searchTerm) {
        where.OR = [
            { user: { name: { contains: searchTerm, mode: 'insensitive' } } },
            { bio: { contains: searchTerm, mode: 'insensitive' } }
        ];
    }

    if (minPrice || maxPrice) {
        where.pricePerHour = {
            gte: minPrice ? parseFloat(minPrice) : undefined,
            lte: maxPrice ? parseFloat(maxPrice) : undefined,
        };
    }

    return await prisma.tutorProfile.findMany({
        where,
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            },
            reviews: true
        },
        orderBy: sortBy ? { [sortBy]: sortOrder || 'desc' } : { averageRating: 'desc' }
    });
};



export const TutorService = { createOrUpdateProfile, updateAvailability, getAllTutors };