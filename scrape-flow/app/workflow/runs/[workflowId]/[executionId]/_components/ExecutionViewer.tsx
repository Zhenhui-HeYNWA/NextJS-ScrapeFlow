'use client'

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, CircleDashed, ClockIcon, CoinsIcon, LucideIcon, Workflow } from "lucide-react";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

export default function ExecutionViewer({
  initialData,
}: {
  initialData: ExecutionData;
}) {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });
  return (
    <div className="flex h-full w-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">

        <div className="py-4 px-2">

         

          <ExecutionLabel icon={CircleDashed} label={"Status"} value={query.data?.status}/>
          

          <ExecutionLabel icon={CalendarIcon} label={"Started at"} value={<span className="lowercase">{query.data?.startedAt? formatDistanceToNow(new Date(query.data?.startedAt),{addSuffix:true}):'-'}</span>}/>
          <ExecutionLabel icon={ClockIcon} label={"Duration"} value={'TODO'}/>
          <ExecutionLabel icon={CoinsIcon} label={"Credits consumed"} value={'TODO'}/>
        </div>

        <Separator/>

        <div className="flex justify-center items-center py-2 px-4">
          <div className=" text-muted-foreground flex items-center gap-2">
            <Workflow size={20} className=" stroke-muted-foreground/80"/>
            <span className=" font-semibold">Phases</span>
          </div>
        </div>

        <Separator/>
         <div className=" overflow-auto h-full px-2 py-4">
             {query.data?.phases.map((phase,index)=>(
               <Button key={phase.id} className="w-full justify-between" variant={'ghost'}>

                <div className=" flex items-center gap-2">
          <Badge  variant={'outline'}>{index+1}</Badge>
              <p className="font-semibold">
             {phase.name}</p>
             </div>
             </Button>
    ))}
 </div>
      </aside>
    </div>
  );
}


function ExecutionLabel({icon,label,value}:{icon:LucideIcon,label:ReactNode,value:ReactNode}){

  const Icon = icon;
    return( 
  <div className="flex justify-between items-center py-2 px-4 text-sm">
    <div className="text-muted-foreground flex items-center gap-2">
      <Icon size={20} className="stroke-muted-foreground/80"/>
      <span>{label}</span>
    </div>
    <div className="font-semibold capitalize flex gap-2 items-center">
      {value}
    </div>
  </div>
  
)
}