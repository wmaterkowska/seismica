import prisma from "./prisma";
import { Prisma } from '@prisma/client'

async function saveEventToDb(userSub: string, data: Prisma.EventCreateInput) {

  const user = await prisma.user.findUnique({
    where: {
      sub: userSub
    }
  });
  if (!user) throw new Error();

  const newEvent = await prisma.event.create({
    data: {
      ...data,
      user: {
        connect: { id: user.id }
      }
    }
  });
  return newEvent;
};


async function getEventFromDb(userSub: string, date: string) {

  const user = await prisma.user.findUnique({
    where: {
      sub: userSub
    }
  });
  if (!user) throw new Error();

  const event = await prisma.event.findUnique({
    where: {
      date: date
    }
  });
  return event;
};

async function getEventsFromDb(userSub: string) {

  const user = await prisma.user.findUnique({
    where: {
      sub: userSub
    }
  });
  if (!user) throw new Error();

  const events = await prisma.event.findMany({
    where: {
      userId: user.id
    }
  });
  return events;
};

export {
  saveEventToDb,
  getEventFromDb,
  getEventsFromDb
}