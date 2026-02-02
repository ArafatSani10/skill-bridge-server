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

const getAllCategories = async () => {
    return await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};

const updateCategoryInDB = async (id: string, name: string) => {
    return await prisma.category.update({
        where: { id },
        data: { name }
    });
};

const deleteCategoryFromDB = async (id: string) => {
    return await prisma.category.delete({
        where: { id }
    });
};


export const CategoryService = {
    createCategory,
    getAllCategories,
    updateCategoryInDB,
    deleteCategoryFromDB
};