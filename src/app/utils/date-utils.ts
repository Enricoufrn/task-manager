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