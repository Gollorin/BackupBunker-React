import ApiCallManager from "../../models/ApiCallManager";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Login.css';

function Login() {

    const apiCallManager = new ApiCallManager();
    const navigate = useNavigate();
  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setMessage] = useState(false);
  

    useEffect(() => {
        if(sessionStorage.getItem("HAS-LOGIN") != null){
            navigate('/home');
        }
    });

    const IsInputValid = () => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if(emailRegex.test(email)) {
        return true
      } else {
        return false;
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      if(!IsInputValid()) {
        setMessage(true);
        return;
      }

      const response = await apiCallManager.callApi('login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });

      if(response != null) {
        const { Id } = response;
        sessionStorage.setItem("HAS-LOGIN", Id);
  
        navigate("/home");
      } else {
        setMessage(true);
      }
    };
  
    
    return (
        <main className="login">
            <form method='post' onSubmit={handleSubmit}>

                <h2>Login</h2>

                <label>
                    <h3>Email</h3>
                    <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email...' required />
                </label>

                <label>
                    <h3>Password</h3>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password...' required />
                </label>

                <span className={showMessage ? "warn" : "none"}>Your incredencial are wrong!</span>

                <button type='submit' className="btn bl">Login</button>

            </form>
        </main>
    );
}

export default Login;