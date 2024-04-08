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

export const updateUser = async (userId, userData) => {
    try {
        return await axios.post(`${host_address}/api/v1/users/${userId}`,
            userData, getAuthConfigJSON())
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

export const saveCreatedVideo = async (creatorId, videoObject) => {
    try {
        return await axios.post(`${host_address}/api/v1/video/${creatorId}/saveVideo`,
            videoObject,  getAuthConfigMultiPart())
    }catch (e) {
        throw e;
    }
}

export const getCommentsById = async (requestId) => {
    try {
        return await axios.get(`${host_address}/api/v1/comments/${requestId}`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}

export const createNewComment = async (comment, requestId) => {
    try {
        return await axios.post(`${host_address}/api/v1/comments/create/${requestId}`,
            comment, getAuthConfigJSON())
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


// export const getVideoDetailsByRequestId = async (requestId) => {
//     try {
//         return await axios.get(`${host_address}/api/v1/video/${requestId}/requestVideoDetails`, getAuthConfig())
//     }catch (e) {
//         throw e;
//     }
// }

// export const getVideoDetailsByVideoName = async (videoName) => {
//     try {
//         return await axios.get(`${host_address}/api/v1/video/${videoName}/videoInfo`, getAuthConfig())
//     }catch (e) {
//         throw e;
//     }
// }


export const getVideoDetailsListByCreatorId = async (creatorId) => {
    try {
        return await axios.get(`${host_address}/api/v1/video/${creatorId}/videos`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}


export const getNotifications = async (userId) => {
    try {
        return await axios.get(`${host_address}/api/v1/notifications/${userId}`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}

export const updateNotifications = async (userId) => {
    try {
        return await axios.post(`${host_address}/api/v1/notifications/update/${userId}`, new FormData(), getAuthConfigJSON())
    }catch (e) {
        throw e;
    }
}

export const deleteNotificationById = async (notificationId) => {
    try {
        return await axios.delete(`${host_address}/api/v1/notifications/delete/${notificationId}`,
            getAuthConfigJSON())
    }catch (e) {
        throw e;
    }
}

export const deleteAllNotifications = async (userId) => {
    try {
        return await axios.delete(`${host_address}/api/v1/notifications/deleteAll/${userId}`,
            getAuthConfigJSON())
    }catch (e) {
        throw e;
    }
}

export const getVideoSubmissionsByRequestId = async (requestId) => {
    try {
        return await axios.get(`${host_address}/api/v1/video/${requestId}/videoSubmissions`, getAuthConfig())
    }catch (e) {
        throw e;
    }
}

export const getRequestVideoByVideoId = (videoId, requestId) =>
    `${host_address}/api/v1/video/${videoId}/requestVideo?requestId=${requestId}`;

export const getSavedVideoByVideoId = (videoId) =>
    `${host_address}/api/v1/video/${videoId}/savedVideo`;

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
