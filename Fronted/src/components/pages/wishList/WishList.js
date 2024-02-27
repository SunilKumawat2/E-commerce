import React, { useEffect, useState } from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import Footer from '../../Footer';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import WishList1 from "../../../assets/images/wishList.webp"
const WishList = () => {
        const [WishList, setWishList] = useState([]);
        const [WishListLength, setWishListLength] = useState([]);

        // <----------------- Get the Wsih List Products-------------->
        const GetWishList = async () => {
                const StoredToken = localStorage.getItem('token')
                if (!StoredToken) {
                        console.log("No Token Provided the User")
                }
                const headers = {
                        Authorization: ` ${StoredToken}`
                }
                await axios.get(`${API_BASE_URL}/ProductAddWishList/get`, { headers }).then((WishListResponse) => {
                        setWishList(WishListResponse.data.data)
                        setWishListLength(WishListResponse.data)
                }).catch((error) => {
                        console.log(error)
                })
        }
        console.log("WishList", WishList)
        useEffect(() => {
                GetWishList();
        }, [])
        return (
                <div>
                        {/* This is Header Section here */}
                        <NewHeader />

                        <div className="category-section">
                                <div className="container">
                                        <div className="row">
                                                <div className="wishlist-category">
                                                        <div  className="shart-category">
                                                                {
                                                                        WishListLength && WishListLength?.data ? (
                                                                                WishList?.map((WishListResult) => {
                                                                                        return (
                                                                                                <>
                                                                                                        <div className="wishlist-list">
                                                                                                                <img className="img-fluid" style={{ width: "400px", height: "300px" }}
                                                                                                                        src={`${IMG_BASE_URL}${WishListResult?.images}`} />
        
                                                                                                                <div className="favorite-icon"><a href="#">
                                                                                                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                                <path d="M8.15501 2.29741L8.1469 2.2896L8.13896 2.28161C6.51791 0.649935 3.85154 0.595038 2.23852 2.27039C0.58716 3.98557 0.58716 6.78158 2.23852 8.49676L9.27962 15.81C9.67298 16.2185 10.327 16.2185 10.7204 15.81L17.7615 8.49676C19.4128 6.78158 19.4128 3.98557 17.7615 2.27039C16.1307 0.576537 13.5028 0.576537 11.872 2.27039C11.8673 2.2753 11.8625 2.28032 11.8575 2.28545C11.6187 2.53372 11.1343 3.03738 10.4298 3.17465C9.6086 3.33466 8.84604 2.96232 8.15501 2.29741Z" fill="#FEC403" stroke="#FEC403" stroke-width="2" />
                                                                                                                        </svg>
        
                                                                                                                </a> </div>
                                                                                                        </div>
                                                                                                </>
                                                                                        )
                                                                                })
                                                                        ):(
                                                                                <div className='text-center'>
                                                                                        <img src={WishList1} />
                                                                                </div>

                                                                        )
                                                                }
                                                               


                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                {/* <--------- Footer section ----------> */}
                                <Footer />
                        </div>
                </div>
        )
}

export default WishList