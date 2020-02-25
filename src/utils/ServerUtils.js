import {checkTokenQuery, loginQuery, addUserQuery} from "./GraphQLQueries";
//let URL = window.location.href.replace('/panel', '') + '/graphql';
//Test API Server
let URL = 'https://cors-anywhere.herokuapp.com/http://172.106.202.159/graphql';

function authenticateToken(token) {
    return fetchQuery(checkTokenQuery, {token}).then(handleResponse);
}

function authenticateUser(email, password) {
    return fetchQuery(loginQuery, {email, password}).then(handleResponse);
}

function addUser(firstName, lastName, email, phoneNumber, permissions, password) {
    return fetchQuery(addUserQuery, {token: 'EIS9Zy5a4GiprK3kryR78ClkSNBvSQxPMyF8SaWuxJ0Hg3B52dX954PxVzTLP1tf', firstName, lastName, email, phoneNumber, permissions, password}).then(handleResponse);
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

export {authenticateToken, authenticateUser, addUser};