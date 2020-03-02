const loginQuery = `
mutation CheckUser($email: String, $password: String) {
    authenticateUser(email: $email, password: $password) {
        token
        id
        firstName
        lastName
        email
        phoneNumber
    }
}
`;

const checkTokenQuery = `
mutation CheckToken($token: String) {
    authenticateToken(token: $token) {
        id
        firstName
        lastName
        email
        phoneNumber
        token
    }
}
`;

const getLoadQuery = `
query ($token: String, $id: String) {
    loadById(token: $token, id: $id) {
        id
        brokerName
        loadNumber
        rate
        detention
        driver
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
        earnings
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
        brokerName
        loadNumber
        rate
        detention
        driver
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
        earnings
        phoneNumber
        status
    }
}
`;

const addLoadQuery = `
mutation AddLoad($token: String, $brokerName: String, $loadNumber: String, $rate: Float, $detention: Float, $driverId: String, $status: String, $paid: Boolean) {
    addLoad(token: $token, brokerName: $brokerName, loadNumber: $loadNumber, rate: $rate, detention: $detention, driverId: $driverId, status: $status, paid: $paid) {
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
mutation AddUser($token: String, $firstName: String, $lastName: String, $email: String, $phoneNumber: String, $permissions: [String]) {
    addUser(token: $token, firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber, permissions: $permissions) {
        id
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
        email
        phoneNumber
        street
        city
        state
        zipCode
        factoring
        factoringName
        factoringStreet
        factoringCity
        factoringState
        factoringZip
    }
}
`;

const getAnnualRevenueQuery = `
query($token: String) {
    getTotalRevenue(token: $token) {
        revenue
    }
}
`;

const getUnpaidLoadsQuery = `
query ($token: String) {
    getUnpaidLoads(token: $token) {
        revenue
    }
}
`;

const getCurrentLoadsQuery = `
query ($token: String) {
    getCurrentLoads(token: $token) {
        loads
    }
}
`;

const getCompletedLoadsQuery = `
query ($token: String) {
    getCompletedLoads(token: $token) {
        loads
    }
}
`;

const updateUserQuery = `
mutation UpdateUser($token: String, $userId: String, $firstName: String, $lastName: String, $email: String, $phoneNumber: String) {
    updateUser(token: $token, userId: $userId, firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber) {
        id
        firstName,
        lastName,
        email,
        phoneNumber
    }
}
`;

const updateUserPasswordQuery = `
mutation UpdateUserPassword($token: String, $userId: String, $currentPassword: String, $newPassword: String) {
    updateUserPassword(token: $token, userId: $userId, currentPassword: $currentPassword, newPassword: $newPassword) {
        id
        token
    }
}
`;

const getCarrierQuery = `
query ($token: String) {
    getCarrierProfile(token: $token) {
        name
        email
        phoneNumber
        street
        city
        state
        zipCode
        factoring
        factoringName
        factoringStreet
        factoringCity
        factoringState
        factoringZip
    }
}
`;

const updateLoadStatusQuery = `
mutation UpdateLoadStatus($token: String, $loadId: String, $status: String, $paid: Boolean) {
    updateLoadStatus(token: $token, loadId: $loadId, status: $status, paid: $paid) {
        status
        paid
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
    changeDriverStatusQuery,
    updateCarrierQuery,
    getAnnualRevenueQuery,
    getUnpaidLoadsQuery,
    getCompletedLoadsQuery,
    getCurrentLoadsQuery,
    updateUserQuery,
    updateUserPasswordQuery,
    getCarrierQuery,
    updateLoadStatusQuery
};