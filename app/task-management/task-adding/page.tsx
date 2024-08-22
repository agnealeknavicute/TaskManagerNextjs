import TaskFormComponent from "@/app/ui/tasks/task-form-component";
import React from "react";

export default async function TaskAddingPage() {
  return (
    <>
      <TaskFormComponent modal={false} />
    </>
  );
}
