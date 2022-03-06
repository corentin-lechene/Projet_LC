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
        if(onlyKey && values[i] === undefined)
            continue;
        obj[key] = values[i];
    }
    return obj;
}

function createValue(src, layer = false) {
    let values = [];
    let keys_layer = layer ? Object.keys(layer) : undefined;
    let keys_src = Object.keys(src);

    if(layer) {
        for (let i = 0; i < keys_layer.length; i++) {
            for (let j = i; j < keys_src.length; j++) {
                if (keys_layer[i] === keys_src[j]) {
                    values.push(src[keys_src[j]]);
                    break;
                }
            }
        }
    } else {
        for (const key in src) {
            values.push(src[key]);
        }
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