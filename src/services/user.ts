import exp from "constants";
import { Prisma } from "../generated/prisma";
import { prisma } from "../libs/prisma"

export const createUser = async (data: Prisma.UserCreateInput) => {
   const result = await prisma.user.upsert({
    where: {
        email: data.email
    },
    update: {
        role: "ADMIN"
    },
    create: data
   });
   return result;
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try{
    return await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });
    }catch(error){
        return false;
    }
}

export const getAllUsers= async () => {
    let page = 2
    let skip = (page - 1) * 2;

    const users = await prisma.user.findMany({
        skip: skip,
        take: 2
    });
    return users;
}

export const getUserByEmail = async (email: string) => {
        const user = await prisma.user.findFirst({
            where: {email},
            select: {
                id: true,
                name: true
            }
        });
        return user;
}

export const updateUser = async () => {
    const updateUser = await prisma.user.updateMany({
        where: {
            email: {endsWith: 'gmail.com'}
        },
        data: {
            status: false
        }
    })

    return updateUser;
}

export const deleteUser = async () => {
    const deletedUser = await prisma.user.deleteMany({
        where: {
            status: false
        }
    })
}