import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [cookies] = useCookies(["cookie-name"]);
    const navigate = useNavigate();
    useEffect(() => {
    if (cookies.jwt) {
        navigate(-1);
    }
    }, [cookies, navigate]);
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const generateError = (error) =>
        toast.error(error, {
        position: "bottom-right",
    });
    const handleSubmit = async (event) => {
      props.setProgress(30)
        event.preventDefault();
        try {
          const { data } = await axios.post(
            "https://istock.onrender.com/api/auth/login",
            {
              ...values,
            }, {
              withCredentials: true,
              credentials: 'include'
            }
          );
          props.setProgress(80);
          if (data) {
            if (data.errors) {
                const { email, password } = data.errors;
                if (email) generateError(email);
                else if (password) generateError(password);
            } else {
              navigate("/");
            }
          }
        } catch (ex) {
          console.log(ex);
        }
        props.setProgress(100);
    };
  return (
    <div className="d-flex register-container justify-content-center pt-5">
            <div className="col-sm-5 login-form">
                <div className="card p-4">
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-3">Login</h1>
                        <div className="form-group">
                            <label>Email address:</label>
                            <input type="email" className="form-control" placeholder="Enter email"
                            id="email" name='email' onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                            id="pwd" name='password' onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 w-100">Login</button>
                        <p className='text-center p-2 m-0'>New Here? <Link to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
  )
}

export default Login
