import { prisma } from "../../lib/prisma";

const createReview = async (
    studentId: string,
    tutorId: string,
    bookingId: string,
    rating: number,
    comment: string
) => {
    return await prisma.$transaction(async (tx) => {
        const review = await tx.review.create({
            data: {
                studentId,
                tutorId,
                bookingId,
                rating,
                comment
            }
        });

        const avgData = await tx.review.aggregate({
            where: { tutorId },
            _avg: { rating: true }
        });

        await tx.tutorProfile.update({
            where: { id: tutorId },
            data: { averageRating: avgData._avg.rating || 0 }
        });

        return review;
    });
};

export const ReviewService = { createReview };