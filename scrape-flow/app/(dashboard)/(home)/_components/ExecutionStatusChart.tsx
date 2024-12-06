'use client';

import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats';
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
import { Layers2 } from 'lucide-react';
import { Area, CartesianGrid, XAxis, AreaChart } from 'recharts';
type ChartDate = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>;

const chartConfig = {
  success: {
    label: 'Success',
    color: 'hsl(var(--chart-2))',
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--chart-1))',
  },
};
export default function ExecutionStatusChart({ data }: { data: ChartDate }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Layers2 className="h-6 w-6 text-primary" />
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily number of successful and failed failed workflow executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h[200px] w-full" config={chartConfig}>
          <AreaChart
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
            <Area
              min={0}
              type={'natural'}
              fillOpacity={0.6}
              fill="var(--color-success)"
              stroke="var(--color-success)"
              dataKey={'success'}
              stackId={'a'}
            />
            <Area
              min={0}
              type={'natural'}
              fillOpacity={0.6}
              fill="var(--color-failed)"
              stroke="var(--color-failed)"
              dataKey={'failed'}
              stackId={'a'}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
