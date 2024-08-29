export interface IAssignedUsers {
    assignedUsers: string[];
}

export interface IGroup extends IAssignedUsers {
    _id: string;
    id: number;
    title: string;
}
