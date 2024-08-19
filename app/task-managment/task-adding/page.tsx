import TaskFormComponent from "@/app/ui/tasks/TaskFormComponent";
import React from "react";

export default async function TaskAddingPage() {
  return (
    <>
      <TaskFormComponent modal={false}/>
    </>
  );
}
