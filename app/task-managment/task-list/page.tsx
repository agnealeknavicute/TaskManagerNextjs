import TaskListComponent from "@/app/ui/tasks/TaskListComponent";
import React, { Suspense } from "react";
import Loading from "../loading";

export default function TaskListPage() {
  return (
    <div className="py-12">
      <TaskListComponent />
    </div>
  );
}
