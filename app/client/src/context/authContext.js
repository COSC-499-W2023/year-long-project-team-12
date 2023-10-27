import { createContext,useEffect,useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    const login = () => {
        setCurrentUser({
            id:1,
            name: "Rasmus Hojlund",
            profilePic:"https://d3nfwcxd527z59.cloudfront.net/content/uploads/2023/10/05162319/Rasmus-Hojlund.jpg",
            userType: "Interviewee",
            email:"rasmus@scores.com"
        });

    };


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser,login }}>
            {children}
        </AuthContext.Provider>
    );
};