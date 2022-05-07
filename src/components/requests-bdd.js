/* Global */

function getUrl(table, id = false) {
    id = !id ? '' : '/'+ id;
    return `${process.env.VUE_APP_API_ADDRESS}/${table}${id}`;
}

export function sendGetDataTable(table, id = false) {
    let url = getUrl(table, id);
    const headers = {
        method: 'get',
        headers: {
            "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`,
            'Content-Type': 'application/json'
        }
    }

    return fetch(url, headers)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        }).then((json) => { return json; })
        .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
}


export function sendInsertTable(table, body) {
    let url = getUrl(table);
    const headers = {
        method: 'post',
        headers: {
            "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return fetch(url, headers)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
}

export function sendDeleteTable(table, id) {
    let url = getUrl(table, id);
    const headers = {
        method: 'delete',
        headers: {
            "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`,
            'Content-Type': 'application/json'
        }
    }
    return fetch(url, headers)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
}

export function sendUpdateTable(table, id, body) {
    let url = getUrl(table, id);
    const headers = {
        method: 'put',
        headers: {
            "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
}


export function sendGetUserByToken() {
    let token = localStorage.getItem('user_token');
    if (token) {
        let url = getUrl('token');
        const headers = {
            method: 'post',
            headers: {
                "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        }
        return fetch(url, headers)
            .then(response => response.json())
            .then((json) => { return json; })
            .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
    } else {
        console.error("error token not found");
    }
}

export function sendGetUserByLogin(body) {
    let url = getUrl('login');
    const headers = {
        method: 'post',
        headers: {
            "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return fetch(url, headers)
        .then(response => response.json())
        .then((json) => { return json; })
        .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
}

export function sendSetOnline(route, id) {
    const url = getUrl(route +"-online", id);
    const headers = {
        method: 'put',
        headers: {
            "Access-Control-Allow-Origin": `${process.env.VUE_APP_API_ADDRESS}`
        },
    }
    return fetch(url, headers).then(response => response.json()).then((json) => { return json; })
        .catch((err) => { console.error("My Error: [fetch]", err); return -1;});
}