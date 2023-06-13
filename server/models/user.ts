import prisma from "./index";
import { Prisma } from '@prisma/client'

async function saveUserToDb(data: Prisma.UserCreateInput) {
  const newUser = await prisma.user.create({
    data: {
      ...data,
      createdAt: new Date(),
    }
  });
  return newUser;
};


export {
  saveUserToDb
}