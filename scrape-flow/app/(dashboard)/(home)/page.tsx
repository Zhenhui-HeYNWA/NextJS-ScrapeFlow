import { GetPeriods } from '@/actions/analytics/getPeriods';
import React, { Suspense } from 'react';
import PeriodSelector from '@/app/(dashboard)/(home)/_components/PeriodSelector';
import { Period } from '@/types/analytics';
import { waitFor } from '@/lib/helper/waitFor';
import { Skeleton } from '@/components/ui/skeleton';
import { GetStatsCardsValues } from '@/actions/analytics/getStatsCardsValues';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';
import StatsCard from '@/app/(dashboard)/(home)/_components/StatsCard';
import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecutions';
import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats';
import ExecutionStatusChart from '@/app/(dashboard)/(home)/_components/ExecutionStatusChart';
import { GetCreditUsageInPeriod } from '@/actions/analytics/getCreditUsageInPeriod';
import CreditUsageChart from '@/app/(dashboard)/billing/__components/CreditUsageChart';

const HomePage = ({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) => {
  const currentDate = new Date();

  const { month, year } = searchParams;

  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="h-[40px] w-[180px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="flex h-full flex-col gap-4 py-6">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const periods = await GetPeriods();

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod);

  return (
    <div className="grid min-h-[120px] gap-3 lg:grid-cols-3 lg:gap-8">
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecution}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Phase executions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
      <StatsCard
        title="Credits consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-3 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[120px] w-full" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);
  return <ExecutionStatusChart data={data} />;
}
export default HomePage;

async function CreditsUsageInPeriod({
  selectedPeriod,
}: {
  selectedPeriod: Period;
}) {
  const data = await GetCreditUsageInPeriod(selectedPeriod);

  return (
    <CreditUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
    />
  );
}
