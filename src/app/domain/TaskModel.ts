import { TaskStatusEnum } from "./TaskStatusEnum";
import { UserModel } from "./UserModel";

export class TaskModel {

    id: string | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
    status: TaskStatusEnum | string | null | undefined
    owner: UserModel | null | undefined;
    createdAt: Date | null | undefined | string;
    updatedAt: Date | null | undefined | string;

    constructor(id: string | null | undefined, title: string | null | undefined, description: string | null | undefined, status: TaskStatusEnum | null | undefined, owner: UserModel | null | undefined, createdAt: Date | null | undefined | string, updatedAt: Date | null | undefined | string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }



}