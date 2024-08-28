import { HasAssignedUsers } from './client-group-model';

export interface ITask extends HasAssignedUsers {
    id: number;
    title: string;
    description: string;
    type: TaskTypes;
    createdOn: Date;
    status: TaskStatuses;
    assignedGroup: number;
}

export enum TaskTypes {
    HighUrgency = 'High Urgency',
    MediumUrgency = 'Medium Urgency',
    LowUrgency = 'Low Urgency',
}
export enum TaskStatuses {
    NotStarted = 'Not started',
    InProgress = 'In progress',
    Done = 'Done',
}
