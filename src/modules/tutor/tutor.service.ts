import { prisma } from "../../lib/prisma";

const createOrUpdateProfile = async (userId: string, data: any) => {
    return await prisma.tutorProfile.upsert({
        where: { userId: userId },
        update: {
            bio: data.bio,
            pricePerHour: parseFloat(data.pricePerHour), // Float এর জন্য parseFloat
            experience: parseInt(data.experience),       // Int এর জন্য parseInt
            // categories আপডেট করার লজিক একটু আলাদা হয়, আপাতত সাধারণ ফিল্ডগুলো সেভ করি
        },
        create: {
            userId: userId,
            bio: data.bio,
            pricePerHour: parseFloat(data.pricePerHour),
            experience: parseInt(data.experience),
        },
    });
};

export const TutorService = { createOrUpdateProfile };