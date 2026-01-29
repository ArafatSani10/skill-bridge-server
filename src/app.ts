import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { TutorRoutes } from "./modules/tutor/tutor.routes";
import { BookingRoutes } from "./modules/booking/booking.routes";
import { ReviewRoutes } from "./modules/review/review.routes";

const app: Application = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.all("/api/auth/*", (req, res) => {
    return toNodeHandler(auth)(req, res);
});

app.use("/api/tutor", TutorRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/reviews", ReviewRoutes);

app.get("/", (req, res) => {
    res.send("Skill Bridge is running ...");
});

export default app;