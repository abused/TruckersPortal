import {
    checkTokenQuery,
    loginQuery,
    addUserQuery,
    getAnnualRevenueQuery,
    getUnpaidLoadsQuery,
    getCurrentLoadsQuery,
    getCompletedLoadsQuery,
    getDriversQuery,
    getLoadsQuery,
    addLoadQuery,
    getLoadQuery,
    addDriverQuery,
    getUsersQuery,
    updateUserPasswordQuery,
    updateUserQuery,
    getCarrierQuery,
    updateCarrierQuery,
    updateLoadStatusQuery,
    updateDriverStatusQuery
} from "./GraphQLQueries";
//let URL = window.location.href.replace('/panel', '') + '/graphql';
//Test API Server
let URL = 'http://172.106.202.159/graphql';

function authenticateToken(token) {
    return fetchQuery(checkTokenQuery, {token}).then(handleResponse);
}

function authenticateUser(email, password) {
    return fetchQuery(loginQuery, {email, password}).then(handleResponse);
}

function addUser(token, firstName, lastName, email, phoneNumber, permissions, password) {
    return fetchQuery(addUserQuery, {token, firstName, lastName, email, phoneNumber, permissions, password}).then(handleResponse);
}

function getAnnualRevenue(token) {
    return fetchQuery(getAnnualRevenueQuery, {token}).then(handleResponse);
}

function getUnpaidRevenue(token) {
    return fetchQuery(getUnpaidLoadsQuery, {token}).then(handleResponse);
}

function getCurrentLoads(token) {
    return fetchQuery(getCurrentLoadsQuery, {token}).then(handleResponse);
}

function getCompletedLoads(token) {
    return fetchQuery(getCompletedLoadsQuery, {token}).then(handleResponse);
}

function getDrivers(token) {
    return fetchQuery(getDriversQuery, {token}).then(handleResponse);
}

function getLoads(token) {
    return fetchQuery(getLoadsQuery, {token}).then(handleResponse);
}

function addLoad(token, brokerName, loadNumber, rate, detention, driverId, status, paid) {
    return fetchQuery(addLoadQuery, {token, brokerName, loadNumber, rate: parseFloat(rate), detention: parseFloat(detention), driverId, status, paid}).then(handleResponse);
}

function getLoad(token, loadId) {
    return fetchQuery(getLoadQuery, {token, id: loadId}).then(handleResponse);
}

function addDriver(token, name, payCut, phoneNumber) {
    return fetchQuery(addDriverQuery, {token, name, payCut, phoneNumber}).then(handleResponse);
}

function getUsers(token) {
    return fetchQuery(getUsersQuery, {token}).then(handleResponse);
}

function updateUser(token, userId, firstName, lastName, email, phoneNumber) {
    return fetchQuery(updateUserQuery, {token, userId, firstName, lastName, email, phoneNumber}).then(handleResponse);
}

function updateUserPassword(token, userId, currentPassword, newPassword) {
    return fetchQuery(updateUserPasswordQuery, {token, userId, currentPassword, newPassword}).then(handleResponse);
}

function getCarrierData(token) {
    return fetchQuery(getCarrierQuery, {token}).then(handleResponse);
}

function updateCarrier(vars) {
    return fetchQuery(updateCarrierQuery, vars).then(handleResponse);
}

function updateLoad(token, loadId, status, paid) {
    return fetchQuery(updateLoadStatusQuery, {token, loadId, status, paid: paid}).then(handleResponse);
}

function updateDriverStatus(token, driverId, status) {
    return fetchQuery(updateDriverStatusQuery, {token, driverId, status}).then(handleResponse);
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

export {
    authenticateToken,
    authenticateUser,
    addUser,
    getAnnualRevenue,
    getUnpaidRevenue,
    getCurrentLoads,
    getCompletedLoads,
    getDrivers,
    getLoads,
    addLoad,
    getLoad,
    addDriver,
    getUsers,
    updateUser,
    updateUserPassword,
    getCarrierData,
    updateCarrier,
    updateLoad,
    updateDriverStatus
};