/* Global */

function sendGetDataTable(table, id = false) {
    let url = `${process.env.VUE_APP_API_ADDRESS}/${table}${parseInt(id) ? `/${parseInt(id)}` : ``}`;
    return fetch(url)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("err: fetch", err); });
}

function sendInsertTable(table, body) {
    let url = `${process.env.VUE_APP_API_ADDRESS}/${table}`;
    let headers = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
    return fetch(url, headers)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("err: fetch", err); });
}

function sendDeleteTable(table, id) {
    let url = `${process.env.VUE_APP_API_ADDRESS}/${table}/${parseInt(id)}`;
    return fetch(url, {method: 'delete'})
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("err: fetch", err); });
}

export {sendGetDataTable, sendInsertTable, sendDeleteTable};


function sendGetUserByToken() {
    let token = localStorage.getItem('user_token');
    if (token) {
        let url = `${process.env.VUE_APP_API_ADDRESS}/token/${token}`;
        return fetch(url)
            .then(response => response.json())
            .then((json) => { return json; })
            .catch((err) => { console.error("err: fetch", err); });
    } else {
        console.error("error token not found");
    }
}
export {sendGetUserByToken};

