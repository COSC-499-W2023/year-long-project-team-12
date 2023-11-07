import { createContext,useContext,useEffect,useState } from "react";
import {jwtDecode} from "jwt-decode";
import {login as performLogin} from "../services/ClientAPI.js"

const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
      );
    
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
        //setCurrentUserFromToken();
    }, [currentUser]);

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);
                console.log(res)
                const decodedToken = jwtDecode(jwtToken);
                console.log(decodedToken);
                // localStorage.setItem("user", JSON.stringify({
                //     username: decodedToken.sub,
                //     firstname: res.data.userDetailsDTO.firstName,
                    
                // }))
                setCurrentUser({
                    username: decodedToken.sub,
                    firstname: res.data.userDetailsDTO.firstName,
                    lastname: res.data.userDetailsDTO.lastName,
                    email : res.data.userDetailsDTO.email,
                    

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

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            logOut,
            isCustomerAuthenticated,
            setCurrentUserFromToken
            }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

