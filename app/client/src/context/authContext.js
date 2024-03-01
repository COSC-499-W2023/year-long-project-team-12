import { createContext,useContext,useEffect,useState } from "react";
import {jwtDecode} from "jwt-decode";
import {login as performLogin, saveCurrentUser} from "../services/ClientAPI.js"

const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
      );
    const [currentRequest,setRequest] = useState(
        JSON.parse(localStorage.getItem("currentRequest")) || null
    );

    const setCurrentRequest = (request) => {
        setRequest({
            requestId: request.requestId,
            creatorId: request.creatorId,
            title: request.title,
            description: request.description,
            assigneeId: request.assigneeId,
            created: request.created,
            expiration: request.expiration,
            submitted: request.submitted
        });
    };

    const setCurrentUserFromToken = () => {
        let token = localStorage.getItem("access_token");

        if(token) {
            token = jwtDecode(token);
            console.log(token)
            setCurrentUser({
                username: token.sub,
            })
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


    useEffect(() => {
        localStorage.setItem("currentRequest", JSON.stringify(currentRequest));
    }, [currentRequest]);

    const register = async (currentUser) => {
        return new Promise((resolve, reject) => {
            saveCurrentUser(currentUser).then((resp) => {
                const jwtToken = resp.headers['authorization'];
                localStorage.setItem('access_token', jwtToken);
               // console.log(resp);
                const decodedToken = jwtDecode(jwtToken);
                setCurrentUser({
                    username: decodedToken.sub,
                    userId: resp.data.userDetailsDTO.userId,
                    firstname: resp.data.userDetailsDTO.firstName,
                    lastname: resp.data.userDetailsDTO.lastName,
                    email: resp.data.userDetailsDTO.email,
                    role: resp.data.userDetailsDTO.userRole,
                })
                resolve(resp);
            }).catch(err => {
                reject(err);
            })
        })
    }


    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);
               // console.log(res)
                const decodedToken = jwtDecode(jwtToken);
              //  console.log(decodedToken);
                setCurrentUser({
                    username: decodedToken.sub,
                    userId: res.data.userDetailsDTO.userId,
                    firstname: res.data.userDetailsDTO.firstName,
                    lastname: res.data.userDetailsDTO.lastName,
                    email : res.data.userDetailsDTO.email,
                    role: res.data.userDetailsDTO.userRole,
                })
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
        setCurrentUser(null);
    }

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if(!token){
            return false;
        }
        const {exp: expiration} = jwtDecode(token);
        if (Date.now() > expiration*1000) {
            logOut()
            return false;
        }
        return true;
    }

    const isHiring = () => {
        return currentUser?.role === 'ADMIN';
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            currentRequest,
            register,
            login,
            logOut,
            setCurrentRequest,
            isCustomerAuthenticated,
            setCurrentUserFromToken, 
            isHiring
            }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

