'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartColumnStackedIcon } from 'lucide-react';
import { Area, CartesianGrid, XAxis, AreaChart, BarChart, Bar } from 'recharts';
import { GetCreditUsageInPeriod } from '@/actions/analytics/getCreditUsageInPeriod';
type ChartDate = Awaited<ReturnType<typeof GetCreditUsageInPeriod>>;

const chartConfig = {
  success: {
    label: 'Successful Phase Credits',
    color: 'hsl(var(--chart-2))',
  },
  failed: {
    label: 'Failed Phase Credits',
    color: 'hsl(var(--chart-1))',
  },
};
export default function CreditUsageChart({
  data,
  title,
  description,
}: {
  data: ChartDate;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <ChartColumnStackedIcon className="h-6 w-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h[200px] w-full" config={chartConfig}>
          <BarChart
            data={data}
            height={200}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={'date'}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Bar
              fillOpacity={0.8}
              radius={[0, 0, 4, 4]}
              fill="var(--color-success)"
              stroke="var(--color-success)"
              dataKey={'success'}
              stackId={'a'}
            />
            <Bar
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
              fill="var(--color-failed)"
              stroke="var(--color-failed)"
              dataKey={'failed'}
              stackId={'a'}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
