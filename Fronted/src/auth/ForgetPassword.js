import React, { useState } from 'react'
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import loginbg from "../assets/images/login-bg.png";
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/AuthReducer';
import axios from 'axios';
import { API_BASE_URL } from '../config/Config';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/images/logos.png";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const loginbgImgaes = {
    backgroundImage: `url(${loginbg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
};
    const [email,setEmail]= useState("");

    const LoginSubmtHandle = (e)=>{
      e.preventDefault();
      axios.post(`${API_BASE_URL}/user/login`,{email}).then((response)=>{
        if(response.status === 201){
          const { data } = response;
            const {token:newToken} = data.data;
            localStorage.setItem('token',newToken)
          const is_veerify1 = localStorage.getItem("is_veerify","true")
          localStorage.setItem("is_Login",'true')
          if(!is_veerify1){
            alert("Please Verify The User") 
          }
          else{
            alert("Successfully Send the OTP on Your Email")
            setEmail("")
            navigate("/New-Password")
          }
          
        }
      }) .catch((error)=>{
        if(error.response && error.response.data){
            const errorMessage = error.response.data.message;
            if(errorMessage === "Invalid password"){
                alert("Invalid password");
                console.log("Invalid password")
    
            }
            else if(errorMessage === "User not found"){
                alert("User not found")
                console.log("User not found")
            }
            else{
                alert("error.......")
            }
        }
        })
    }
    return (
        <div>
            <div class="signup-section" style={loginbgImgaes}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-lg-5 col-xl-5 col-xxl-5 mx-auto">
                            <div class="signup-content">
                                <div class="logo-login">
                                <img src={Logo} style={{width:"200px"}}/>

                                </div>
                                <form onSubmit={LoginSubmtHandle} method='post'>
                                    <div class="login-bg-section">
                                        <h6>Forget Password</h6>
                                        <input type="email" placeholder="Email Address" 
                                        class="form-control" name="email" value={email}
                                         onChange={(e)=>setEmail(e.target.value)}/>
                                       
                                          <input type="submit"  value="Send OTP"
                                         class="form-control submit-btn" />
                                    </div>
                                  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;