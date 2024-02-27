import React, { useState } from 'react';
import loginbg from "../assets/images/login-bg.png";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/reducers/AuthReducer';
import { setUser } from '../redux/reducers/AuthReducer'; // Update the path
import {SignUp} from "../redux/actions/AuthActions"
import axios from 'axios';
import { API_BASE_URL } from '../config/Config';
import Logo from "../assets/images/logos.png";
const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector(setUser);
    const navigate = useNavigate();
    const loginbgImgaes = {
        backgroundImage: `url(${loginbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [conf_password, setConf_password] = useState("");
    
    const userdata = {
        name,
        email,
        phone,
        password,
        conf_password
    }

    const SubmitSignUpDetails = async(e)=>{
        e.preventDefault();
       await axios.post(`${API_BASE_URL}/user/post`,userdata).then((response)=>{
        if (response.status === 201) {
            const { data } = response;
            const {token:newToken} = data.data;
            localStorage.setItem('token',newToken)
            dispatch(setUser(data));
            alert("Successfully Add The User...");
            navigate("/Otp-Verify")
        } else {
            alert("Error Adding User - Non-success status code");
        }
       }).catch((error)=>{
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
    
            if (errorMessage === "Email is already in Use") {
                alert("Email is already in Use");
            } else if (errorMessage === "Passwords do not match") {
                alert("Passwords do not match");
            } else if (errorMessage.includes("Phone Number")) {
                alert(errorMessage);
            } else {
                alert("Error Adding User");
            }
        } else {
            alert("Error Adding User");
        } 
      })
    }
    return (
        <div><div class="signup-section" style={loginbgImgaes}>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-lg-5 col-xl-5 col-xxl-5 mx-auto">
                        <div class="signup-content">
                            <div class="logo-login">
                               <img src={Logo} style={{width:"200px"}}/>

                            </div>
                            <form onSubmit={SubmitSignUpDetails} method='post'>
                                <div class="login-bg-section">
                                    <h6>Signup</h6>
                                    <input type="text" name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="First Name" class="form-control" />

                                    <input type="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder="Email Address" class="form-control" name="email" />

                                    <input type="number" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                     placeholder="Mobile Number" class="form-control" name="phone" />

                                    <input type="password" value={password}
                                     onChange={(e)=>setPassword(e.target.value)}
                                      placeholder="Password" class="form-control"
                                        name="Password" />

                                    <input type="password" value={conf_password}
                                     onChange={(e)=>setConf_password(e.target.value)}
                                      placeholder="Confirm Password" class="form-control" name="conf_password" />

                                    
                                         <input type="submit" value="signup" class="form-control submit-btn" />
                                       

                                </div>
                                <div class="login-footer"><Link to="/Login">
                                    Already have an account login here!</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default Register