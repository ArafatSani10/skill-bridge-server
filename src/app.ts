import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.all("/api/auth/*", (req, res) => {
    return toNodeHandler(auth)(req, res);
});

app.get("/", (req, res) => {
    res.send("Skill Bridge is running ...");
});

export default app;