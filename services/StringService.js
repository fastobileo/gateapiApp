async function jsonToArray(json){
    console.log(json);
    let array = []
    for(var jsonRow in json){
        const key = jsonRow;
        const value = json[jsonRow];
        array[key] = value;
    }
    console.log(array);
    return array;
}

module.exports.jsonToArray = jsonToArray;