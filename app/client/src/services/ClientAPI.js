import axios from 'axios';

const host_address = process.env.REACT_APP_EXZBT_API_URL;

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getCurrentUsers = async () => {
    try {
        return await axios.get(`${host_address}/api/v1/user/get/all/1`
        )
    } catch (e) {
        throw e;
    }
}

export const saveCurrentUser = async (currentUser) => {
    try {
        return await axios.post(`${host_address}/api/v1/`,
            currentUser,  {headers: {'Content-Type': 'application/json'}})
    }catch (e) {
        throw e;
    }
}

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
//from interviewer page
// export const saveJobPosting = async (jobData) => {
    // try {
    //   return await axios.post(
    //     `${host_address}/api/`,
    //     jobData,
    //     getAuthConfig()
    //   );
    // } catch (e) {
    //   throw e;
    // }
//   }; 
//start of function for saving a new job posting