import { useContext } from "react"
import "./Login.scss"
import { AuthContext } from "../../context/authContext"
import { Link, redirect } from "react-router-dom";

const Login = () => {


    const {login} = useContext(AuthContext);

    const handleLogin = () => {
        login();
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
                <Link to="/register">
                <button>Register</button>
                </Link>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Email or username"/>
                    <input type="password" placeholder="Password"/>
                    <button onClick={handleLogin}>Login</button>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Login