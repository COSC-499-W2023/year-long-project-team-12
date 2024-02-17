import "./Login.scss"
import { useAuth } from "../../context/authContext"
import {redirect, useNavigate,Navigate,} from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const { login, isCustomerAuthenticated } = useAuth();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginParam, setLoginParam] = useState("");
    const [password, setPassword] = useState("");
    const [show403ErrorPopup, setShow403ErrorPopup] = useState(false);
    let navigate = useNavigate();

    if(isCustomerAuthenticated()){
        return <Navigate to="/profile"/>
      }

    const toggleRegister = () => {
        navigate("/register")
    };

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const object= {};
            const formData = new FormData();

            if(isValidEmail(loginParam)){
                formData.append("email", loginParam)
            }else {
                formData.append("username", loginParam)
            }
            formData.append("password", password)

            formData.forEach((value, key) => object[key] = value);
            const loginParamAndPassword = JSON.stringify(object)
            console.log(loginParamAndPassword)
            
            login(loginParamAndPassword).then(resp => {
                navigate("/profile");
            })
        } catch (error) {
            setLoading(false); 
        
            if (error.response.status === 403){
                setShow403ErrorPopup(true);
            } else {
                setError(true); 
            }
        }
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>EX-ZBT</h1>
                    <p>
                    The purpose of the software is to provide a video sharing platform 
                     It allows users to register, create profiles, upload and share videos and receive feedback based on their video submissions.
                    </p>
                    <button onClick={toggleRegister}>Register</button>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" name="loginParam" placeholder="Email or username" value={loginParam} onChange={(e) => setLoginParam(e.target.value)}/>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button disabled={!loginParam || !password} type="submit">{loading ? "Please wait" : "Login"}</button>
                        <span
                         data-testid="error"
                         style={{visibility:error? "visible":"hidden"}}
                        >Something went wrong!
                        </span>
                    </form>

                </div>
            </div>
            
            {show403ErrorPopup && (
                <div className="error-popup">
                    Access denied. You do not have permission to perform this action.
                    <button onClick={() => setShow403ErrorPopup(false)}>Close</button>
                </div>
            )}

        </div>

        
    )
}

export default Login;