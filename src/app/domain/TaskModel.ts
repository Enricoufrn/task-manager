import { TaskStatusEnum } from "./TaskStatusEnum";
import { UserModel } from "./UserModel";

export interface TaskModel {
    id: string | null | undefined,
    title: string | null | undefined,
    description: string | null | undefined,
    status: string | null | undefined,
    owner: UserModel | null | undefined,
    createdAt: Date | null | undefined | string,
    updatedAt: Date | null | undefined | string
}