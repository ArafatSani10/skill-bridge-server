import express, { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
    "/",
    auth(UserRole.STUDENT),
    BookingController.createBooking
);

router.get(
    "/",
    auth(UserRole.STUDENT, UserRole.TUTOR),
    BookingController.getMyBookings
);

export const BookingRoutes: Router = router;