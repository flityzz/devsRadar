module.exports = function parseStringToArray(arrayToString){
    return arrayToString.split(',').map(tech => tech.trim());

    //SPLITA CADA TECH A PARTIR DA VIRGULA
    //USAR O MAP PARA PERCORRER O ARRAY E TIRAR OS ESPAÇOS COM O TRIM
}