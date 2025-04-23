/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.base.createMany({
    data: [
      {
        name: 'Catu',
        state: 'BA',
      },
      {
        name: 'Salvador',
        state: 'BA',
      },
    ],
  });

  const bases = await prismaClient.base.findMany();

  const hashedPassword = await hash('12345678', 12);

  await prismaClient.user.create({
    data: {
      cpf: '18888186034',
      name: 'Participante 1',
      email: 'participante1@email.com',
      password: hashedPassword,
      baseId: bases[0].id,
      phone: '+5511989898989',
      position: 'Estagiário',
      role: 'PARTICIPANT',
    },
  });

  await prismaClient.user.create({
    data: {
      cpf: '54050211050',
      name: 'Participante 2',
      email: 'participante2@email.com',
      password: hashedPassword,
      baseId: bases[0].id,
      phone: '+5511989898981',
      position: 'Desenvolvedor',
      role: 'PARTICIPANT',
    },
  });

  await prismaClient.user.create({
    data: {
      cpf: '85000570090',
      name: 'Avaliador 1',
      email: 'avaliador1@email.com',
      password: hashedPassword,
      baseId: bases[0].id,
      phone: '+5511989898982',
      position: 'Diretor',
      role: 'EVALUATION_COMMITTEE',
    },
  });

  await prismaClient.user.create({
    data: {
      cpf: '34474669010',
      name: 'Avaliador 2',
      email: 'avaliador2@email.com',
      password: hashedPassword,
      baseId: bases[0].id,
      phone: '+5511989898955',
      position: 'Diretor',
      role: 'EVALUATION_COMMITTEE',
    },
  });

  await prismaClient.period.createMany({
    data: [
      {
        title: 'Inscrição',
        description: 'Período de inscrição dos candidatos.',
        startDate: '2025-03-25T00:00:00.000Z',
        endDate: '2025-04-05T23:59:59.000Z',
        type: 'SUBSCRIPTION',
      },
      {
        title: 'Avaliação',
        description: 'Período de avaliação dos inscritos.',
        startDate: '2025-04-06T00:00:00.000Z',
        endDate: '2025-04-20T23:59:59.000Z',
        type: 'AVALIATION',
      },
      {
        title: 'Reinscrição',
        description: 'Período para candidatos refazerem a inscrição.',
        startDate: '2025-04-22T00:00:00.000Z',
        endDate: '2025-04-30T23:59:59.000Z',
        type: 'RESUBSCRIPTION',
      },
      {
        title: 'Reavaliação',
        description: 'Nova avaliação após reinscrição.',
        startDate: '2025-05-01T00:00:00.000Z',
        endDate: '2025-05-10T23:59:59.000Z',
        type: 'REAVALIATION',
      },
      {
        title: 'Final',
        description: 'Divulgação do resultado final.',
        startDate: '2025-05-11T00:00:00.000Z',
        endDate: '2025-05-15T23:59:59.000Z',
        type: 'FINAL',
      },
      {
        title: 'Encerrado',
        description: 'Período inativo após encerramento do processo.',
        startDate: '2025-05-16T00:00:00.000Z',
        endDate: '2025-12-31T23:59:59.000Z',
        type: 'INACTIVE',
      },
    ],
  });
  console.log('Seed completed 🚀');
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
