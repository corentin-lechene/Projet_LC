/* Global */

function getUrl(table, id = false) {
    return `${process.env.VUE_APP_API_ADDRESS}/${table}${parseInt(id) ? `/${parseInt(id)}` : ``}`;
}

export function sendGetDataTable(table, id = false) {
    let url = getUrl(table, id);
    return fetch(url)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("err: fetch", err); });
}

export function sendInsertTable(table, body) {
    let url = getUrl(table);
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

export function sendDeleteTable(table, id) {
    let url = `${process.env.VUE_APP_API_ADDRESS}/${table}/${parseInt(id)}`;
    return fetch(url, {method: 'delete'})
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("err: fetch", err); });
}



export function sendGetUserByToken() {
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

export function sendGetUserByLogin(body) {
    let url = getUrl('login');
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

