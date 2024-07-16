import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTestMessages = async () => {
  await prisma.message.create({
    data: {
      content: 'Hello, World!',
      createdAt: new Date('2023-10-01 10:00:00'),
      updatedAt: new Date('2023-10-01 10:00:00'),
    },
  });
  await prisma.message.create({
    data: {
      content: '動作確認用のメッセージになります',
      createdAt: new Date('2023-10-01 18:00:00'),
      updatedAt: new Date('2023-10-01 18:00:00'),
    },
  });
};
