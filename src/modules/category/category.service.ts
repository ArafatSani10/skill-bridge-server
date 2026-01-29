import { prisma } from "../../lib/prisma";

const createCategory = async (subjectName: string) => {
    const isExist = await prisma.category.findUnique({
        where: { name: subjectName },
    });

    if (isExist) {
        throw new Error(`Subject '${subjectName}' already exists in the category list.`);
    }

    return await prisma.category.create({
        data: { name: subjectName },
    });
};

export const CategoryService = {
    createCategory,
};