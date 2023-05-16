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

  const parseSmallDate = (date) => {
    const dateObject = new Date(date);
    return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`
  }

  const parseISODate = (date) => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }
  
  export {
    parseDate,
    parseSmallDate,
    parseISODate
  }