const loginQuery = `
mutation CheckUser($email: String, $password: String) {
    authenticateUser(email: $email, password: $password) {
        token
    }
}
`;

const checkTokenQuery = `
mutation CheckToken($token: String) {
    authenticateToken(token: $token) {
        token
    }
}
`;

const getLoadQuery = `
query ($token: String, $id: String) {
    loadById(token: $token, id: $id) {
        id
        loadNumber
        rate
        detention
        driverId
        status
        paid
    }
}
`;

const getDriverQuery = `
query ($token: String, $id: String) {
    driverById(token: $token, id: $id) {
        id
        name
        payCut
        loadsComplete
        phoneNumber
        status
    }
}
`;

const getUserQuery = `
query ($token: String, $id: String) {
    userById(token: $token, id: $id) {
        id
        firstName
        lastName
        email
        phoneNumber
        permissions
        password
        token
    }
}
`;

const getLoadsQuery = `
query ($token: String) {
    getLoads(token: $token) {
        id
        loadNumber
        rate
        detention
        driverId
        status
    }
}
`;

const getUsersQuery = `
query ($token: String) {
    getUsers(token: $token) {
        id
        firstName
        lastName
        email
        phoneNumber
        permissions
        password
        token
    }
}
`;

const getDriversQuery = `
query ($token: String) {
    getDrivers(token: $token) {
        id
        name
        payCut
        loadsComplete
        phoneNumber
        status
    }
}
`;

const addLoadQuery = `
mutation AddLoad($token: String, $loadNumber: String, $rate: Float, $detention: Float, $driverId: String, $status: String) {
    addLoad(token: $token, loadNumber: $loadNumber, rate: $rate, detention: $detention, driverId: $driverId, status: $status) {
        id
    }
}
`;

const addDriverQuery = `
mutation AddDriver($token: String, $name: String, $payCut: Float, $phoneNumber: String) {
    addDriver(token: $token, name: $name, payCut: $payCut, phoneNumber: $phoneNumber) {
        id
    }
}
`;

const addUserQuery = `
mutation AddUser($token: String, $firstName: String, $lastName: String, $email: String, $phoneNumber: String, $permissions: [String], $password: String) {
    addUser(token: $token, firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, permissions: $permissions, password: $password) {
        id
        token
    }
}
`;

const addDriverLoadQuery = `
mutation AddDriverLoad($token: String, $id: String, $loadId: String) {
    addDriverLoad(token: $token, id: $id, loadId: $loadId) {
        id
    }
}
`;

const addTokenQuery = `
mutation AddToken($token: String, $newToken: String) {
    addToken(token: $token, newToken: $newToken) {
        token
    }
}
`;

const changeDriverStatusQuery = `
mutation ChangeDriverStatus($token: String, $id: String, $status: String) {
    changeDriverStatus(token: $token, id: $id, status: $status) {
        id
    }
}
`;

const updateCarrierQuery = `
mutation UpdateCarrier($token: String, $name: String, $email: String, $phoneNumber: String, $street: String, $city: String, $state: String, $zipCode: String, $factoring: Boolean, $factoringName: String, $factoringStreet: String, $factoringCity: String, $factoringState: String, $factoringZip: String) {
    updateCarrier(token: $token, name: $name, email: $email, phoneNumber: $phoneNumber, street: $street, city: $city, state: $state, zipCode: $zipCode, factoring: $factoring, factoringName: $factoringName, factoringStreet: $factoringStreet, factoringCity: $factoringCity, factoringState: $factoringState, factoringZip: $factoringZip) {
        name
    }
}
`;

const getAnnualRevenueQuery = `
mutation GetAnnualRevenue($token: String) {
    getTotalRevenue(token: $token) {
        revenue
    }
}
`;

const getUnpaidLoadsQuery = `
mutation GetAnnualRevenue($token: String) {
    getUnpaidLoads(token: $token) {
        revenue
    }
}
`;

const getCurrentLoadsQuery = `
mutation GetAnnualRevenue($token: String) {
    getCurrentLoads(token: $token) {
        loads
    }
}
`;

const getCompletedLoadsQuery = `
mutation GetAnnualRevenue($token: String) {
    getCompletedLoads(token: $token) {
        loads
    }
}
`;

export {
    loginQuery,
    checkTokenQuery,
    getLoadQuery,
    getDriverQuery,
    getUserQuery,
    getLoadsQuery,
    getUsersQuery,
    getDriversQuery,
    addLoadQuery,
    addDriverQuery,
    addUserQuery,
    addDriverLoadQuery,
    addTokenQuery,
    changeDriverStatusQuery,
    updateCarrierQuery,
    getAnnualRevenueQuery,
    getUnpaidLoadsQuery,
    getCompletedLoadsQuery,
    getCurrentLoadsQuery
}