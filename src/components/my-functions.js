import jsonwebtoken from "jsonwebtoken";

function preventingErrorSQL(result) {
    if(result === undefined) {
        console.error("My Error: request empty !");
        return true;
    }
    if (result.error && result.valid === undefined) {
        this.$router.push({name: 'Maintenance'});
        console.error("My SQL Error: ", result.reason);
        return true;
    }
    return false;
}

function validRequest(result) {
    if(result === undefined) {
        console.error("My Error: request empty !");
        return true;
    }
    if (!result.valid) {
        console.error("My Error: ", result.reason);
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

function createValue(src, layer) {
    if (typeof src[0] !== 'object') {
        src = [src];
    }

    let values = [];
    let temp = [];

    for (let i = 0; i < src.length; i++) {
        values.push([]);
        for (let j = 0; j < layer.length; j++) {
            for (const [key, val] of Object.entries(src[i])) {
                if (key === layer[j]) {
                    temp.push([key, val]);
                    break;
                }
            }
        }
        values[i] = Object.fromEntries(temp);
    }
    return values;
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
    if (typeof str === 'string') {
        str = str.toString();
        return `${str.substring(0, end)} ${(str.length > end) ? "[..]" : ""}`;
    }
    return str;
}

export {displayLongStr};

export function getTotalReductionOf(reduction, price) {
    if(reduction === 0)
        return price;
    return price - (price * (reduction / 100));
}

export function getReductionOf(reduction, price) {
    if(reduction === 0)
        return 0;
    return price * (reduction / 100);
}