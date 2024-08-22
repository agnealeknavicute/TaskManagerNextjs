export interface ITask {
    id: number;
    title: string;
    description: string;
    type: TaskTypes;
    createdOn: Date;
    status: TaskStatuses;
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
