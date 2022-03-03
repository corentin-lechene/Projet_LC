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

