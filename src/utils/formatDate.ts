export function formatDate(date: string) {
    const [year, month, day] = date.split('-');

    const monthNames = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const formattedDate = `${day} de ${monthNames[Number(month) - 1]} de ${year}`;

    return formattedDate;
}