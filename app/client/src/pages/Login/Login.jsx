import "./Login.scss";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
    const { login, isCustomerAuthenticated } = useAuth();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginParam, setLoginParam] = useState("");
    const [password, setPassword] = useState("");
    const [show403ErrorPopup, setShow403ErrorPopup] = useState(false);
    const [forgotPasswordUsername, setForgotPasswordUsername] = useState("");
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [inputOutline, setInputOutline] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    let navigate = useNavigate();

    if (isCustomerAuthenticated()) {
        return <Navigate to="/profile" />;
    }

    const toggleRegister = () => {
        navigate("/register");
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setShow403ErrorPopup(false);

        try {
            const object = {};
            const formData = new FormData();

            if (isValidEmail(loginParam)) {
                formData.append("email", loginParam);
            } else {
                formData.append("username", loginParam);
            }
            formData.append("password", password);

            formData.forEach((value, key) => (object[key] = value));
            const loginParamAndPassword = JSON.stringify(object);

            await login(loginParamAndPassword).then((resp) => {
                navigate("/profile");
            });
        } catch (error) {
            setLoading(false);

            if (error.response && error.response.status === 403) {
                setShow403ErrorPopup(true);
            } else {
                setError(true);
            }
        }
    };

    const handleForgotPasswordSubmit = async (event) => {
        event.preventDefault();
        
        setInputOutline("green");
        setShowPopup(true);

    };

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>EX-ZBT</h1>
                    <p>
                        The purpose of the software is to provide a video sharing platform. It allows users to register, create profiles, upload and share videos, and receive feedback based on their video submissions.
                    </p>
                    <button onClick={toggleRegister}>Register</button>
                </div>
                {!showForgotPasswordForm && (
                    <div className="right">
                        <h1>Login</h1>
                        <form onSubmit={handleLogin}>
                            <input type="text" name="loginParam" placeholder="Email or username" value={loginParam} onChange={(e) => setLoginParam(e.target.value)} />
                            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button disabled={!loginParam || !password} type="submit">
                                {loading ? "Please wait..." : "Login"}
                            </button>
                            <span data-testid="error" style={{ visibility: error ? "visible" : "hidden" }}>
                                Something went wrong!
                            </span>
                        </form>
                        <a href="#!" className="forgot-password-link" onClick={() => setShowForgotPasswordForm(true)}>
                            Forgot your password?
                        </a>
                    </div>
                )}

                {showForgotPasswordForm && (
                    <div className="right">
                        <h2>Reset Password</h2>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <input
                                type="text"
                                placeholder="Email or username"
                                value={forgotPasswordUsername}
                                onChange={(e) => setForgotPasswordUsername(e.target.value)}
                                style={{ outlineColor: inputOutline }}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <a href="#!" className="back-arrow" onClick={() => setShowForgotPasswordForm(false)}>
                            ← Back
                        </a>
                    </div>
                )}
            </div>

            {show403ErrorPopup && (
                <div className="error-popup">
                    <p>Incorrect login details, ensure your username/email and password are entered correctly.</p>
                    <button onClick={() => setShow403ErrorPopup(false)}>Close</button>
                </div>
            )}

            {showPopup && (
                <div className="popup-message">
                    <p>Displayed for MVP purposes. Full implementation of resetting passwords to be added.</p>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Login;
