// import { prisma } from "../lib/prisma";
// import { Role } from "@prisma/client";
// async function seedAdmin() {
//     console.log("Seeding process start hocche...");

//     const adminEmail = "admin2@gmail.com";
//     const plainPassword = "admin1234";

//     try {
//         const existingUser = await prisma.user.findUnique({
//             where: { email: adminEmail }
//         });

//         if (existingUser) {
//             console.log("User already exists. Skipping...");
//             return;
//         }

//         await prisma.user.create({
//             data: {
//                 name: "Admin shaheb",
//                 email: adminEmail,
//                 role: Role.ADMIN,
//                 emailVerified: true,
//                 accounts: {
//                     create: {
//                         providerId: "credential",
//                         accountId: adminEmail,
//                         password: plainPassword,
//                     }
//                 }
//             }
//         });

//         console.log("Admin and Account successfully created!");

//     } catch (err) {
//         console.error("Error dhora poreche:", err);
//     } finally {
//         await prisma.$disconnect();
//         console.log("Seeding process finished.");
//     }
// }

// seedAdmin();

// import { prisma } from "../lib/prisma";
// import { Role } from "@prisma/client";
// import bcrypt from "bcrypt"; //

// async function seedAdmin() {
//     console.log("Seeding process start hocche...");

//     // নতুন জিমেইল ব্যবহার করা হয়েছে যাতে ডুপ্লিকেট না হয়
//     const adminEmail = "admin3@gmail.com"; 
//     const plainPassword = "admin1234";

//     try {
//         const existingUser = await prisma.user.findUnique({
//             where: { email: adminEmail }
//         });

//         if (existingUser) {
//             console.log("User already exists with this email. Skipping...");
//             return;
//         }

//         // পাসওয়ার্ড হ্যাশ করা হচ্ছে যাতে Better-Auth লগইন করতে পারে
//         const hashedPassword = await bcrypt.hash(plainPassword, 10);

//         await prisma.user.create({
//             data: {
//                 name: "Admin shaheb2",
//                 email: adminEmail,
//                 role: Role.ADMIN,
//                 emailVerified: true,
//                 accounts: {
//                     create: {
//                         providerId: "credential",
//                         accountId: adminEmail,
//                         password: hashedPassword, // হ্যাশ করা পাসওয়ার্ড সেভ হচ্ছে
//                     }
//                 }
//             }
//         });

//         console.log(`Admin successfully created with email: ${adminEmail}`);

//     } catch (err) {
//         console.error("Error dhora poreche:", err);
//     } finally {
//         await prisma.$disconnect();
//         console.log("Seeding process finished.");
//     }
// }

// seedAdmin();


import { prisma } from "../lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt"; //

async function seedAdmin() {
    console.log("Seeding process start hocche...");

    // নতুন জিমেইল ব্যবহার করছি যাতে ডাটাবেসে কনফ্লিক্ট না হয়
    const adminEmail = "admin4@gmail.com"; 
    const plainPassword = "admin1234";

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (existingUser) {
            console.log("User already exists with this email. Skipping...");
            return;
        }

        // মূল কাজ: পাসওয়ার্ড হ্যাশ করা
        // এটি করলে ডাটাবেসে পাসওয়ার্ডটি নিরাপদ ফরম্যাটে সেভ হবে যা better-auth চিনতে পারে
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        await prisma.user.create({
            data: {
                name: "Admin shaheb",
                email: adminEmail,
                role: Role.ADMIN,
                emailVerified: true,
                accounts: {
                    create: {
                        providerId: "credential",
                        accountId: adminEmail,
                        password: hashedPassword, // হ্যাশ করা পাসওয়ার্ড এখানে দিচ্ছি
                    }
                }
            }
        });

        console.log(`Success: Admin created with email: ${adminEmail}`);

    } catch (err) {
        console.error("Error dhora poreche:", err);
    } finally {
        await prisma.$disconnect();
        console.log("Seeding process finished.");
    }
}

seedAdmin();