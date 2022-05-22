export const userService = {
    url:'http://api.com.br:8080',
    login,
    logout,
    getCompany,
    getIndividual,
    updateStatus
};

function login(user, pass) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' } ,
        body: JSON.stringify({ user, pass })
    };

    return fetch(userService.url + `/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

async function getCompany(page, size) {
    var pageConverted = page - 1;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization" : JSON.parse(localStorage.user).token }
    };

    const response = fetch(userService.url + `/manager/company?page=` + pageConverted  + '&size=' + size, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response;
    });

    return await response;
}

async function getIndividual(page, size) {
    var pageConverted = page - 1;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization" : JSON.parse(localStorage.user).token }
    };

    const response = fetch(userService.url + `/manager/individual?page=` + pageConverted + '&size=' + size, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response;
    });

    return await response;
}

function logout() {
    localStorage.removeItem('user');
}

function updateStatus(id, approve) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', "Authorization" : JSON.parse(localStorage.user).token } ,
        body: JSON.stringify({ "approve" : approve })
    };

    return fetch(userService.url + `/manager/active/` + id, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

