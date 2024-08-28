export interface HasAssignedUsers {
    assignedUsers: string[];
}

export interface IGroup extends HasAssignedUsers {
    _id: string;
    id: number;
    title: string;
}
