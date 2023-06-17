
export const capitalize = (str) => {
    var splitStr = str.toLocaleLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toLocaleUpperCase() + splitStr[i].substring(1);     
    }

    return splitStr.join(' '); 
 }