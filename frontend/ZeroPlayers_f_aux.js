/* En este fichero meto funciones auxiliares como las de manipulación de fechas*/

function currentDateString(){
    let currentDate = new Date();
    let stringData = currentDate.toUTCString();
    return stringData;
}

export { currentDateString }