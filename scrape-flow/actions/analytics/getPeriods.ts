'use server ';

import prisma from '@/lib/prisma';
import { Period } from '@/types/analytics';
import { auth } from '@clerk/nextjs/server';
import { start } from 'repl';

export async function GetPeriods() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('unauthenticated');
  }

  const years = await prisma.workflowExecution.aggregate({
    where: {
      userId,
    },
    _min: {
      startedAt: true,
    },
  });

  const currentYear = new Date().getFullYear();

  const periods: Period[] = [];

  const minYear = years._min.startedAt
    ? years._min.startedAt.getFullYear()
    : currentYear;

  for (let year = minYear; year <= currentYear; year++) {
    for (let month = 0; month <= 11; month++) {
      periods.push({
        year,
        month,
      });
    }
  }
  return periods;
}
