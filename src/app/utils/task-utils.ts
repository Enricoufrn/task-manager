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

export const formatDateTime = (date: string | null | undefined): string => {
    if (!date) {
        return '';
    }

    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

export const getDateFromString = (date: string | null | undefined): Date | null | undefined => {
    if (!date) {
        return null;
    }

    const formattedDate = new Date(date);
    return formattedDate;
}