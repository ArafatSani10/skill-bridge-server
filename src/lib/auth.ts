import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    // কুকি সেটিংস যা ক্রস-ডোমেইনের জন্য মাস্ট
    cookie: {
        sameSite: "none", 
        secure: true,     
    },

    trustedOrigins: [
        "https://skill-bridge-client-eight.vercel.app",
        "https://skill-bridge-client-j8vt4fryn-arafats-projects-82b84c9a.vercel.app",
        "http://localhost:3000"
    ],

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "STUDENT",
            },
            status: {
                type: "string",
                required: false,
                defaultValue: "ACTIVE",
            },
        },
    },

    // যদি sendUserInfo টাইপ এরর দেয়, তবে এটি বাদ দিয়ে 
    // সরাসরি databaseHooks ব্যবহার করাই বুদ্ধিমানের কাজ
    databaseHooks: {
        session: {
            create: {
                before: async (session) => {
                    const user = await prisma.user.findUnique({
                        where: { id: session.userId }
                    });

                    if (user && user.status === "BLOCKED") {
                        throw new Error("BANNED_USER");
                    }
                }
            }
        }
    }
});