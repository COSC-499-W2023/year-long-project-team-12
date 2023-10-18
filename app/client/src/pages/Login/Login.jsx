import "./Login.scss"

const Login = () => {
  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>EX-ZBT</h1>
                <p>
                    The purpose of the software is to provide a video sharing platform specifically designed for job interviews.
                     It allows users to register, create profiles, upload and share videos for job interviews, and receive feedback/hiring decisions based on their video submissions.
                </p>
                <button>Register</button>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Email or username"/>
                    <input type="password" placeholder="Password"/>
                    <button>Login</button>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Login