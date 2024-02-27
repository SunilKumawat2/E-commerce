import React, { useState } from 'react'
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import loginbg from "../assets/images/login-bg.png";
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/AuthReducer';
import { VerifyOtp } from '../redux/actions/AuthActions';
import axios from 'axios';
import { API_BASE_URL } from '../config/Config';
import { useNavigate } from 'react-router-dom';
const OtpVerify = () => {
  const loginbgImgaes = {
    backgroundImage: `url(${loginbg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(setUser);
    const [email,setEmail]= useState("");
    const [OTP,setOTP]= useState("");


    const OtpVerfiySubmit = async(e)=>{
      e.preventDefault();
      await axios.post(`${API_BASE_URL}/user/otp-verify`,{email,OTP}).then((response)=>{
        console.log("",response)
        if(response.status === 200){
            localStorage.setItem('is_veerify', 'true');
            alert("OTP Verify Successfully")
            navigate("/Login")
        }
       
      })  .catch((error)=>{
        if(error.response && error.response.data){
            const errorMessage = error.response.data.message
            if(errorMessage === "User not found"){
                alert("User Not Found")
            } 
            else if(errorMessage === "OTP has expired. Please request a new OTP."){
             alert("OTP has expired. Please request a new OTP.")
            }
            else if(errorMessage === "Incorrect OTP. Please enter the correct OTP."){
                alert("Incorrect OTP. Please enter the correct OTP.")   
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
                                    <a href="#"><svg width="250" height="100" viewBox="0 0 341 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.3635 72.7273H54.5453C59.5661 72.7273 63.6363 76.7974 63.6363 81.8182V90.9091C63.6363 95.9298 59.5661 100 54.5453 100H36.3635V72.7273Z" fill="#FEC403" />
                                        <path d="M36.3635 36.3636H54.5453C59.5661 36.3636 63.6363 40.4338 63.6363 45.4546V54.5455C63.6363 59.5662 59.5661 63.6364 54.5453 63.6364H36.3635V36.3636Z" fill="white" />
                                        <path d="M0 13.6364L7.20812 6.42824C10.7583 2.87802 16.5144 2.87802 20.0646 6.42824L27.2727 13.6364V63.6364H0V13.6364Z" fill="white" />
                                        <path d="M0 72.7273H27.2727V100H9.09092C4.07015 100 0 95.9299 0 90.9091V72.7273Z" fill="white" />
                                        <path d="M77.2727 45.4546C77.2727 40.4338 81.3428 36.3636 86.3636 36.3636H104.545V90.9091C104.545 95.9299 100.475 100 95.4545 100H81.8182C79.3078 100 77.2727 97.9649 77.2727 95.4546V45.4546Z" fill="white" />
                                        <path d="M150 36.3636H168.182C173.203 36.3636 177.273 40.4338 177.273 45.4546V95.4546C177.273 97.9649 175.238 100 172.727 100H159.091C154.07 100 150 95.9299 150 90.9091V36.3636Z" fill="white" />
                                        <path d="M113.347 44.9147C113.401 40.1077 117.385 36.3636 122.193 36.3636H132.352C137.159 36.3636 141.143 40.1077 141.197 44.9147C141.234 48.1128 141.183 51.665 140.909 54.5455C139.901 65.1221 134.737 78.6365 131.062 87.1718C129.579 90.6163 124.965 90.6163 123.482 87.1718C119.807 78.6365 114.643 65.1221 113.636 54.5455C113.362 51.665 113.311 48.1128 113.347 44.9147Z" fill="white" />
                                        <path d="M240.909 45.4546C240.909 40.4338 244.979 36.3636 250 36.3636H268.182V90.9091C268.182 95.9299 264.112 100 259.091 100H245.455C242.944 100 240.909 97.9649 240.909 95.4546V45.4546Z" fill="white" />
                                        <path d="M313.636 36.3636H331.818C336.839 36.3636 340.909 40.4338 340.909 45.4546V95.4546C340.909 97.9649 338.874 100 336.364 100H322.727C317.706 100 313.636 95.9299 313.636 90.9091V36.3636Z" fill="white" />
                                        <path d="M276.983 44.9147C277.038 40.1077 281.022 36.3636 285.829 36.3636H295.988C300.795 36.3636 304.78 40.1077 304.834 44.9147C304.87 48.1128 304.819 51.665 304.545 54.5455C303.538 65.1221 298.374 78.6365 294.699 87.1718C293.216 90.6163 288.602 90.6163 287.119 87.1718C283.444 78.6365 278.28 65.1221 277.272 54.5455C276.998 51.665 276.947 48.1128 276.983 44.9147Z" fill="white" />
                                        <path d="M200.527 69.3455C199.036 68.2546 198.291 66.2909 198.291 63.4546V59.8546C198.291 55.0546 200.545 52.6546 205.055 52.6546H210.836C215.346 52.6546 217.6 55.0546 217.6 59.8546V61.3818H210.782V59.6909C210.782 59.4 210.673 59.1455 210.455 58.9273C210.273 58.7091 210.036 58.6 209.746 58.6H206.091C205.8 58.6 205.545 58.7091 205.327 58.9273C205.145 59.1455 205.055 59.4 205.055 59.6909V65.4727C205.055 65.7636 205.145 66.0182 205.327 66.2364C205.545 66.4546 205.8 66.5636 206.091 66.5636H219.564V72.4546H217.436V79.7091C217.436 84.5091 215.182 86.9091 210.673 86.9091H204.727C200.218 86.9091 197.964 84.5091 197.964 79.7091V75.5091C197.964 72.6 198.818 70.5455 200.527 69.3455ZM210.073 81.1273C210.364 81.1273 210.6 81.0182 210.782 80.8C211 80.5818 211.109 80.3273 211.109 80.0364V72.4546H205.764C205.473 72.4546 205.218 72.5636 205 72.7818C204.818 73 204.727 73.2546 204.727 73.5455V80.0364C204.727 80.3273 204.818 80.5818 205 80.8C205.218 81.0182 205.473 81.1273 205.764 81.1273H210.073Z" fill="white" />
                                    </svg></a>

                                </div>
                                <form onSubmit={OtpVerfiySubmit} method='post'>
                                    <div class="login-bg-section">
                                        <h6>Otp Verify</h6>
                                        <input type="email" placeholder="Email Address" 
                                        class="form-control" name="email" value={email}
                                         onChange={(e)=>setEmail(e.target.value)}/>
                                        <div class="passwordfield">
                                            <input type="text" placeholder="OTP..."
                                             class="form-control" name="OTP" value={OTP} 
                                             onChange={(e)=>setOTP(e.target.value)} />

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
                                          
                                        <a href="index.html">
                                          <input type="submit"  value="Otp Verify"
                                         class="form-control submit-btn" /></a>
                                         
                                        
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

export default OtpVerify;