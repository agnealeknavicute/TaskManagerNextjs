import { TaskTypes } from "../types/client-task-models";

export function rawTypeToRealType(rawType: number): TaskTypes {
  switch (rawType) {
    case 0:
      return TaskTypes.LowUrgency;
    case 1:
      return TaskTypes.MediumUrgency;
    case 2:
      return TaskTypes.HighUrgency;
    default:
      return TaskTypes.MediumUrgency;
  }
}

export function realTypeToRawType(realType: TaskTypes): 0 | 1 | 2 {
  switch (realType) {
    case TaskTypes.LowUrgency:
      return 0;
    case TaskTypes.MediumUrgency:
      return 1;
    case TaskTypes.HighUrgency:
      return 2;
  }
}
