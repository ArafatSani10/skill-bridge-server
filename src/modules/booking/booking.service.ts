
import { prisma } from "../../lib/prisma";

const createBooking = async (studentId: string, tutorId: string, slotId: string) => {
    const slot = await prisma.availabilitySlot.findUnique({
        where: { id: slotId }
    });

    if (!slot || slot.isBooked) {
        throw new Error("This slot is already booked or does not exist!");
    }

    return await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.create({
            data: {
                studentId,
                tutorId,
                slotId,
                status: "CONFIRMED"
            }
        });

        await tx.availabilitySlot.update({
            where: { id: slotId },
            data: { isBooked: true }
        });

        return booking;
    });
};

const getMyBookings = async (userId: string, role: string) => {
    if (role === "TUTOR") {
        return await prisma.booking.findMany({
            where: { tutorId: userId },
            include: { student: true, slot: true }
        });
    } else {
        return await prisma.booking.findMany({
            where: { studentId: userId },
            include: { tutor: { include: { user: true } }, slot: true }
        });
    }
};

const getBookingById = async (id: string) => {
    return await prisma.booking.findUnique({
        where: { id },
        include: {
            tutor: { include: { user: { select: { name: true, image: true, email: true } } } },
            student: { select: { name: true, email: true } },
            slot: true
        }
    });
};


const updateBookingStatus = async (bookingId: string, status: string) => {
    return await prisma.booking.update({
        where: { id: bookingId },
        data: { status }
    });
};


export const BookingService = { createBooking, getMyBookings, updateBookingStatus, getBookingById };