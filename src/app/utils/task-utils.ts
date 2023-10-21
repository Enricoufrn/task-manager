import { TaskStatusEnum } from "../domain/TaskStatusEnum";

export const getTaskStatus = (status: string | null | undefined) => {
    if (status == null || status == undefined)
        return 'Não definido';
    switch (status) {
        case 'TODO':
            return TaskStatusEnum.TODO;
        case 'DOING':
            return TaskStatusEnum.DOING;
        case 'DONE':
            return TaskStatusEnum.DONE;
        case 'ARCHIVED':
            return TaskStatusEnum.ARCHIVED;
        default:
            return 'Não definido';
    }
}