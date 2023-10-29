import "./Login.scss"
import { useAuth } from "../../context/authContext"
import {redirect, useNavigate} from "react-router-dom";

const Login = () => {
    const { login } = useAuth()
    let navigate = useNavigate();
    const toggleRegister = () => {
        navigate("/register")
    };

    const handleLogin = (event) => {
        event.preventDefault()
        const object= {}
        const formData = new FormData(event.target)
        formData.forEach((value, key) => object[key] = value);
        const usernameAndPassword = JSON.stringify(object)
        let token;
        login(usernameAndPassword).then(resp => {
            navigate("/jobs");
            console.log(token)
        })
        redirect("/jobs")
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>EX-ZBT</h1>
                    <p>
                        The purpose of the software is to provide a video sharing platform specifically designed for job interviews.
                        It allows users to register, create profiles, upload and share videos for job interviews, and receive feedback/hiring decisions based on their video submissions.
                    </p>
                    <button onClick={toggleRegister}>Register</button>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" name="username" placeholder="Email or username"/>
                        <input type="password" name="password" placeholder="Password"/>
                        <button type="submit">Login</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login