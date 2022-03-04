
/* USERS */

function sendGetUsers(id = false) {
    let url = `${process.env.VUE_APP_API_ADDRESS}/users${parseInt(id) ? `/${parseInt(id)}` : `` }`;
    return fetch(url)
        .then(response => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.error("error fetch: ", err);
        });
}

function sendGetUserByToken() {
    let token = localStorage.getItem('user_token');
    if (token) {
        let url = `${process.env.VUE_APP_API_ADDRESS}/token/${token}`;
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                return json;
            })
            .catch((err) => {
                console.error("error fetch: ", err);
            });
    } else {
        console.error("error token not found");
    }
}
export {sendGetUsers, sendGetUserByToken};

/* STAFFS */

function sendGetStaffs(id = false) {
    let url = `${process.env.VUE_APP_API_ADDRESS}/staffs${parseInt(id) ? `/${parseInt(id)}` : `` }`;
    return fetch(url)
        .then(response => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.error("error fetch: ", err);
        });
}
export {sendGetStaffs};

/*INFOS */

function sendInformation(table, id = false){
    let url = `${process.env.VUE_APP_API_ADDRESS}/${table}${parseInt(id) ? `/${parseInt(id)}` : ``}`;
    return fetch(url)
        .then(response => response.json())
        .then((json) => {
            return json;
        })
        .catch((err) => {
            console.error("err: ", err);
        });
}
export {sendInformation};

