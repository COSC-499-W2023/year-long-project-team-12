import axios from 'axios';

const host_address = process.env.REACT_APP_EXZBT_API_URL;

const getAuthConfigJSON = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json'
    }
})

const getAuthConfigMultiPart = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'multipart/form-data'
    }
})

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getUserById = async (userId) => {
    try {
        return await axios.get(`${host_address}/api/v1/users/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getUserByEmail = async (email) => {
    try {
        return await axios.get(`${host_address}/api/v1/users/request/${email}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getCurrentUsers = async () => {
    try {
        return await axios.get(`${host_address}/api/v1/users`
        )
    } catch (e) {
        throw e;
    }
}

export const saveCurrentUser = async (currentUser) => {
    try {
        return await axios.post(`${host_address}/api/v1/`,
            currentUser,{headers: {'Content-Type': 'application/json'}})
    }catch (e) {
        throw e;
    }
}

export const uploadRequestVideo = async (requestId, request) => {
    try {
        return await axios.post(`${host_address}/api/v1/requests/${requestId}/submit`,
            request,  getAuthConfigMultiPart())
    }catch (e) {
        throw e;
    }
}

export const updateProfileImage = async (userId, request) => {
    try {
        return await axios.post(`${host_address}/api/v1/users/${userId}/profileImage`,
            request,  getAuthConfigMultiPart())
    }catch (e) {
        throw e;
    }
}


export const saveRequest = async (request) => {
    try {
        return await axios.post(`${host_address}/api/v1/requests/create`,
            request, getAuthConfigJSON())
    }catch (e) {
        throw e;
    }
}

export const updateRequest = async (requestId, request) => {
    try {
        return await axios.post(`${host_address}/api/v1/requests/edit/${requestId}`,
            request, getAuthConfigJSON())
    }catch (e) {
        throw e;
    }
}

export const deleteRequest = async (requestId) => {
    try {
        return await axios.delete(`${host_address}/api/v1/requests/${requestId}`,
            getAuthConfigJSON())
    }catch (e) {
        throw e;
    }
}

export const getUserRequests = async (userId) => {
    try {
        return await axios.get(`${host_address}/api/v1/requests/created/${userId}`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}

export const getAssignedRequests = async (userId) => {
    try {
        return await axios.get(`${host_address}/api/v1/requests/assigned/${userId}`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}

export const getUserProfileImage = (userId) => 
    `${host_address}/api/v1/users/${userId}/profileImage`;


export const getVideoDetailsByRequestId = async (requestId) => {
    try {
        return await axios.get(`${host_address}/api/v1/video/${requestId}/videoInfo`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}

export const getVideoByVideoId = (videoId) =>
    `${host_address}/api/v1/video/${videoId}/video`;


export const updateCustomer = async (id, update) => {
    try {
        return await axios.put(
            `${host_address}/api/v1/*`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteCustomer = async (id) => {
    try {
        return await axios.delete(
            `${host_address}/api/v1/*`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const login = async (usernameAndPassword) => {
    try {
        return await axios.post(
            `${host_address}/api/v1/auth/login`,
            usernameAndPassword, {headers: {'Content-Type': 'application/json'}})
    } catch (e) {
        throw e;
    }
}
