export const yyyymmdd = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + (date.getDate())).slice(-2)}`
};

