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
const Login = () => {
  const navigate = useNavigate();
  const loginbgImgaes = {
    backgroundImage: `url(${loginbg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
};
    const dispatch = useDispatch();
    const user = useSelector(setUser);
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    const LoginSubmtHandle = (e)=>{
      e.preventDefault();
      axios.post(`${API_BASE_URL}/user/login`,{email,password}).then((response)=>{
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
            alert("Login Successfully")
            setEmail("")
            setPassword("")
            navigate("/")
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
      
    //   const credentials = {
    //     email,
    //     password
    //   }
    //   try{
    //     dispatch(AuthLogin(credentials));

    //     if(user){
    //       setEmail("");
    //        setPassword("");
    //     }
    //   }catch(error){
    //     console.log(error)
    //   }

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
                                        <h6>Login</h6>
                                        <input type="email" placeholder="Email Address" 
                                        class="form-control" name="email" value={email}
                                         onChange={(e)=>setEmail(e.target.value)}/>
                                        <div class="passwordfield">
                                            <input type="password" placeholder="Password"
                                             class="form-control" name="Password" value={password} 
                                             onChange={(e)=>setPassword(e.target.value)} />

                                            <span><svg width="26" height="26" viewBox="0 0 26 26" 
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1" y="1" width="24" height="24" rx="12"
                                                 stroke="black" />
                                                <path d="M12.0473 15.576C11.994 15.576 11.946 15.56
                                                 11.9033 15.528C11.8713 15.4853 11.8553 15.4373 11.8553 
                                                 15.384V14.728C11.8553 14.216 11.9566 13.8053 12.1593 
                                                 13.496C12.362 13.1867 12.6606 12.8507 13.0553 
                                                 12.488C13.3966 12.1787 13.6526 11.9013 13.8233 
                                                 11.656C13.994 11.4 14.0793 11.0853 14.0793 10.712C14.0793
                                                  10.296 13.9833 9.96533 13.7913 9.72C13.5993 9.464
                                                   13.3433 9.336 13.0233 9.336C12.6713 9.336 
                                                   12.394 9.46933 12.1913 9.736C11.9886 9.992 
                                                   11.8873 10.3333 11.8873 10.76V11.096C11.8873 
                                                   11.2133 11.8233 11.272 11.6953 11.272L10.2233
                                                    11.208C10.17 11.208 10.122 11.1867 10.0793 
                                                    11.144C10.0473 11.1013 10.0313 11.0533 10.0313 
                                                    11V10.76C10.0313 10.152 10.1593 9.61333 10.4153
                                                     9.144C10.6713 8.664 11.0286 8.296 11.4873 8.04C11.946
                                                      7.77333 12.474 7.64 13.0713 7.64C13.946 7.64 14.6446
                                                       7.91733 15.1673 8.472C15.69 9.016 15.9513 9.74133
                                                        15.9513 10.648C15.9513 11.128 15.8873 11.5387 
                                                        15.7593 11.88C15.6313 12.2107 15.4766 12.4827 
                                                        15.2953 12.696C15.114 12.9093 14.8793 13.1493 
                                                        14.5913 13.416C14.2926 13.6827 14.0686 13.9173 
                                                        13.9193 14.12C13.7806 14.312 13.7113 14.552 
                                                        13.7113 14.84V15.384C13.7113 15.4373 13.69 
                                                        15.4853 13.6473 15.528C13.6153 15.56 13.5726 
                                                        15.576 13.5193 15.576H12.0473ZM12.7833 19.016C12.
                                                        4526 19.016 12.1806 18.9093 11.9673 18.696C11.7646 
                                                        18.4827 11.6633 18.2107 11.6633 17.88C11.6633 17.
                                                        5493 11.7646 17.2827 11.9673 17.08C12.1806 16.8667
                                                         12.4526 16.76 12.7833 16.76C13.114 16.76 13.386 
                                                         16.8667 13.5993 17.08C13.8126 17.2827 13.9193 
                                                         17.5493 13.9193 17.88C13.9193 18.2107 13.8126 
                                                         18.4827 13.5993 18.696C13.386 18.9093 13.114 
                                                         19.016 12.7833 19.016Z" fill="black" />
                                            </svg>
                                            </span>

                                        </div>
                                          
                                       
                                          <input type="submit"  value="Login"
                                         class="form-control submit-btn" />
                                         
                                       <Link to="/Forget-Password">Forget Password ? </Link>   
                                    </div>
                                    <div class="login-footer"><Link to="/Register">
                                      New User Signup here!</Link></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;