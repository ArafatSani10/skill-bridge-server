import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { TutorRoutes } from "./modules/tutor/tutor.routes";
import { BookingRoutes } from "./modules/booking/booking.routes";
import { ReviewRoutes } from "./modules/review/review.routes";
import { CategoryRoutes } from "./modules/category/category.routes";
import { AdminRoutes } from "./modules/admin/admin.routes";
import { StatsRoutes } from "./modules/stats/stats.routes";
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
app.use("/api/categories", CategoryRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/stats", StatsRoutes);
app.get("/", (req, res) => {
    res.send("Skill Bridge is running ...");
});
export default app;