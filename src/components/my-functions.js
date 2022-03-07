import jsonwebtoken from "jsonwebtoken";

function preventingErrorSQL(result) {
    if (result.error && result.valid === undefined) {
        console.error("SQL Error: ", result.reason);
        return true;
    }
    return false;
}

function validRequest(result) {
    if (!result.valid) {
        console.error("Error: ", result.reason);
        return true;
    }
    return false;
}

export {preventingErrorSQL, validRequest};


function createObject(keys, values, onlyKey = false) {
    let obj = {};
    let i = -1;
    for (const key in keys) {
        i++;
        if (onlyKey && values[i] === undefined)
            continue;
        obj[key] = values[i];
    }
    return obj;
}

function createValue(src, layer = false) {
    let values = [];

    if(!layer) {
        for (const srcKey in src) {
            if(typeof src[srcKey] === 'object')
                values.push(Object.values((src[srcKey]))[0]);
            else
                values.push(src[srcKey]);
        }
        return values;
    }

    if (typeof src[0] !== 'object') {
        src = [src];
    }
    const keys_src = Object.keys(src[0]);
    const keys_layer = layer ? Object.keys(layer) : false;

    for (let i = 0; i < src.length; i++) {
        values.push([]);
        for (let j = 0; j < keys_layer.length; j++) {
            for (let k = 0; k < keys_src.length; k++) {
                if(keys_layer[j] === keys_src[k]) {
                    values[i].push(src[i][keys_src[k]]);
                    break;
                }
            }
        }
    }
    return values.length !== 1 ? values : values[0];
}

export {createObject, createValue};

//Generer un token

function generateToken(data) {
    return jsonwebtoken.sign(
        {data},
        `${process.env.VUE_APP_JWT_KEY_TOKEN}`,
    );
}
export {generateToken};

function displayLongStr(str, end) {
    if (end <= 0)
        return "Error !";
    if(typeof str === 'string') {
        str = str.toString();
        return `${str.substring(0, end)} ${(str.length > end) ? "[..]" : ""}`;
    }
    return str;
}
export {displayLongStr};