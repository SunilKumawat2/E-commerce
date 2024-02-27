import React, { useEffect, useState } from 'react'
import "../adminPages/adminStyle.css";
import LoginImages from "../../assets/images/login.png";
import axios from "axios";
import{ API_BASE_URL} from "../../config/Config";
import{ useNavigate } from "react-router-dom"
const AdminLogin = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const AdminLoginHandle = async(e)=>{
        e.preventDefault();
        await axios.post(`${API_BASE_URL}/admin/login`,{email,password}).then((response)=>{
           if(response.data && response.data.message){
            const ResponseData = response.data.message;
            console.log(response)
            navigate("/AdminSideNav")
           setEmail("")
           setPassword("")
           alert(ResponseData)
           localStorage.setItem("Adminlogin",true)
           }
        }).catch((error)=>{
            if(error.response.data && error.response.data.message ){
                const errorMessage = error.response.data.message;
                alert(errorMessage)
            } 
        })
    }
 
    return (
        <div className='container'>
            <div className='row LoginPage'>
                <form className='LoginForm' onSubmit={AdminLoginHandle} method='post'>
                    <h3 className='LoginHeading'>Login Form</h3>
                    <div>
                        <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Username or email' />
                    </div>
                    <div>
                        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
                    </div>
                    <div className='Loginbutton'>
                        <button  className='btn w-50 '>Login</button>
                    </div>
                </form>
                <div className='Imageside'>
                    <img src={LoginImages} style={{width:"100%"}} alt='Login'/>
                </div>
            </div>
        </div>

    )
}

export default AdminLogin