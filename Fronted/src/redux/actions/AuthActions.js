import { setUser,logout } from "../reducers/AuthReducer";
import axios from "axios";
import {API_BASE_URL} from "../../config/Config";
import * as types from "../types"

export const setUserData = (data)=>({
    type:types.GET_LOGIN_USER_DETAILS,
    payload:data
})
const token = localStorage.getItem('token');
// < -------- Sign Up Action ------------->
export const SignUp = (userData) => async (dispatch)=>{
  await axios.post(`${API_BASE_URL}/user/post`,userData).then((response)=>{
   if (response.status === 201) {
    const { data } = response;
    dispatch(setUser(data));
    alert("Successfully Add The User...");
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
// <----------- Verify OTP Action -------------->
export const VerifyOtp = (credentials) => async (dispatch)=>{
    await axios.post(`${API_BASE_URL}/user/VerifyOTP`,credentials).then((response)=>{
            const {data} = response;
            dispatch(setUser(data))
            alert("OTP Verify Successfully")
    })
    .catch((error)=>{
        if(error.response && error.response.data){
            const errorMessage = error.response.data.message
            if(errorMessage === "User not found"){
                alert("User Not Found123")
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

// <------------ Login Actions ---------------->
export const AuthLogin = (credentials) => async (dispatch) => {
    await axios.post(`${API_BASE_URL}/user/login`,credentials).then((response)=>{
        if(response.status === 201){
            const {data} =  response;
            dispatch(setUser(data));
            const isVerified = localStorage.getItem('is_veerify') === 'true';
            if(!isVerified){
                alert("User Not Verify...")
            }
            else{
                alert("successfully Login User")
                localStorage.setItem("login",true)
            }
        }
    })
    .catch((error)=>{
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
export const fetchProductListRequest = ()=>({
    type:types.FETCH_PRODUCT_REQUEST
})

export const fetchProductListSuccess = (data)=>({
    type:types.FETCH_PRODUCT_LIST_SUCCESS,
    payload:data
});

export const fetchProductListFailure = (error)=>({
    type:types.FETCH_PRODUCT_LIST_FAILURE,
    payload:error
});
// <---------- Logout Actions -------------->
export const LogoutUser = () => async (dispatch)=>{
    await axios.post(`${API_BASE_URL}`).then((response)=>{
        dispatch(logout());
    }).catch((error)=>{
        console.log("Error during the Login",error)
    })
}

export const GetLoginUserDetails = ()=> async (dispatch)=>{
    try{
        dispatch(fetchProductListRequest)
        await axios.get(`${API_BASE_URL}/user/get/login`,{
            headers: {
              Authorization: `${token}`,
            },
          }).then((response)=>{
            setUserData(response.data.data.userData)
            dispatch(fetchProductListSuccess)
          })
    }catch(error){
        console.log(error)
    }
}