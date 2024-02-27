import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/home/Home'
import Product from '../pages/product/Product'
import About from '../pages/about/About'
import Blog from '../pages/blog/Blog'
import Contact from '../pages/contact/Contact'
import Cart from '../pages/cart/Cart'
import WishList from '../pages/wishList/WishList'
import Profile from '../pages/profile/Profile'
import Otp from '../pages/otp/Otp'
import TermsUse from '../pages/termsUse/TermsUse'
import ReturnPolicy from '../pages/returnPolicy/ReturnPolicy'
import ProductDetails from '../pages/productDetails/ProductDetails'
import PrivacyCookies from '../pages/privacyCookies/PrivacyCookies'
import Blogdetails from '../pages/blogdetails/Blogdetails'
import Register from '../../auth/Register'
import Login from '../../auth/Login'
import OtpVerify from '../../auth/OtpVerify'
import AdminSideNav from '../../admin/AdminSideNav'
import Users from '../../admin/adminPages/Users'
import AdminLogin from '../../admin/adminLogin/AdminLogin'
import AdminProduct from '../../admin/adminPages/AdminProduct'
import AdminProductDetails from '../../admin/adminPages/AdminProductDetails'
import Protected from '../protected/Protected'
import AdminProductMoreDetails from '../../admin/adminPages/AdminProductMoreDetails'
import ForgetPassword from '../../auth/ForgetPassword'
import NewPassword from '../../auth/NewPassword'
const AllRouter = () => {
  return (
    <div>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Product-Details/:_id' element={<ProductDetails/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Blog' element={<Blog/>}/>
        <Route path='/Blog-details/:_id' element={<Blogdetails/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/WishList' element={<WishList/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Otp-Verify' element={<OtpVerify/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Forget-Password' element={<ForgetPassword/>}/>
        <Route path='/Otp' element={<Otp/>}/>
        <Route path='/New-Password' element={<NewPassword/>}/>
        <Route path='/TermsUse' element={<TermsUse/>}/>
        <Route path='/ReturnPolicy' element={<ReturnPolicy/>}/>
        <Route path='/Privacy-Cookies' element={<PrivacyCookies/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/AdminSideNav' element={<Protected Component={AdminSideNav}/>} />
        <Route path='/AdminSideNavs' element={<Protected Component={Users}/>}/>
        <Route path='/AdminSideNav/Users' element={<Protected Component={Users}/>}/>
        <Route path='/AdminSideNav/AdminProduct' element={<Protected Component={AdminProduct}/>}/>
        <Route path='/AdminSideNav/AdminProductDetails' element={<Protected Component={AdminProductDetails}/>}/>
        <Route path='/AdminSideNav/AdminProductMoreDetails' element={<Protected Component={AdminProductMoreDetails}/>}/>
     </Routes>
    </div>
  )
}

export default AllRouter