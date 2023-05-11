const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  
  const parseDate = (date) => {
    const dateObject = new Date(date);
    let day = dateObject.getDate();
    let monthIndex = dateObject.getMonth();
    let year = dateObject.getFullYear();
    let monthName = monthNames[monthIndex];
    return `${day} de ${monthName} de ${year}`;
  }
  
  export {
    parseDate
  }