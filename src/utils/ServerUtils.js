import {checkTokenQuery, loginQuery} from "./GraphQLQueries";
let URL = window.location.href.replace('/panel', '') + '/graphql';

function authenticateToken(token) {
    return fetchQuery(checkTokenQuery, {token}).then(handleResponse);
}

function authenticateUser(email, password) {
    return fetchQuery(loginQuery, {email, password}).then(handleResponse);
}

async function fetchQuery(query, variables) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({query, variables})
    };

    return await fetch(URL, options);
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

export {authenticateToken, authenticateUser};