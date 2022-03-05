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

export {createObject};