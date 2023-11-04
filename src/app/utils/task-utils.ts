import { TaskStatusEnum } from "../domain/TaskStatusEnum";

export const getTaskStatus = (status: string | null | undefined) => {
    if (status == null || status == undefined)
        return null;
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
            return null;
    }
}

export const getTaskStatusName = (status: string | null | undefined) => {
    if (status == null || status == undefined)
        return null;
    switch (status) {
        case 'Não iniciada':
            return 'TODO';
        case 'Em progresso':
            return 'DOING';
        case 'Finalizada':
            return 'DONE';
        case 'Arquivada':
            return 'ARCHIVED';
        default:
            return null;
    }
}