import TaskCardComponent from "@/app/ui/tasks/TaskCardComponent";
import React, { Suspense } from "react";
import Loading from "../loading";

export default function TaskCardPage({
  params,
}: {
  params: { taskCardId: string };
}) {
  return (
    <div className="my-12">
      <TaskCardComponent id={params.taskCardId} />
    </div>
  );
}
