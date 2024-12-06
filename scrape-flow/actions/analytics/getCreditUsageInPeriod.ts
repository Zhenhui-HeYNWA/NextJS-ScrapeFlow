'use server';

import { PeriodToDateRange } from '@/lib/helper/dates';
import prisma from '@/lib/prisma';
import { Period } from '@/types/analytics';
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { eachDayOfInterval, format } from 'date-fns';
import { Workflow } from 'lucide-react';

type Stats = Record<
  string,
  {
    success: number;
    failed: number;
  }
>;

const { COMPLETED, FAILED } = WorkflowExecutionStatus;

export async function GetCreditUsageInPeriod(period: Period) {
  const { userId } = auth();
  if (!userId) {
    throw new Error(' Unauthenticated');
  }

  const dataRange = PeriodToDateRange(period);
  const executionsPhases = await prisma.executionPhase.findMany({
    where: {
      userId,
      startedAt: {
        gte: dataRange.startDate,
        lte: dataRange.endDate,
      },
      status: {
        in: [COMPLETED, FAILED],
      },
    },
  });

  const dateFormate = 'yyyy-MM-dd';
  const stats: Stats = eachDayOfInterval({
    start: dataRange.startDate,
    end: dataRange.endDate,
  })
    .map((date) => format(date, dateFormate))
    .reduce((acc, date) => {
      acc[date] = {
        success: 0,
        failed: 0,
      };
      return acc;
    }, {} as any);

  executionsPhases.forEach((phase) => {
    const date = format(phase.startedAt!, dateFormate);
    if (phase.status === COMPLETED) {
      stats[date].success += phase.creditsConsumed || 0;
    }
    if (phase.status === FAILED) {
      stats[date].failed += phase.creditsConsumed || 0;
    }
  });

  const result = Object.entries(stats).map(([date, infos]) => ({
    date,
    ...infos,
  }));
  return result;
}
