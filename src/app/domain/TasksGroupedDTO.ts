import { TaskModel } from "./TaskModel";

export class TasksGroupedDTO {
    status?: string;
    tasks?: TaskModel[];
    total?: number;
}