import { TaskStatuses, TaskTypes } from "../types/models";

export const statusColor = (status: TaskStatuses) => {
  switch (status) {
    case TaskStatuses.NotStarted:
      return "default";
    case TaskStatuses.InProgress:
      return "purple";
    case TaskStatuses.Done:
      return "green";
  }
};
export const typeColor = (type: TaskTypes) => {
  switch (type) {
    case TaskTypes.LowUrgency:
      return "green";
    case TaskTypes.MediumUrgency:
      return "yellow";
    case TaskTypes.HighUrgency:
      return "red";
  }
};
