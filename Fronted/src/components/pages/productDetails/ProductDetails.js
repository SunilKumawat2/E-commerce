import React, { useEffect, useState } from 'react';
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import Footer from '../../Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import 'react-toastify/dist/ReactToastify.css'
const ProductDetails = () => {
  const navigate = useNavigate();
  const [ActiveSize, setActiveSize] = useState(0);
  const { _id } = useParams();
  console.log("_id", _id)
  const [ProductDetailsList, setProductDetailsList] = useState({});
  const [AddQuntity,SetAddQuntity] =  useState(1);

  const HandleActiveSize = (size) => {
    setActiveSize(size)
  }

  const GetProductDetails = async () => {
    await axios.get(`${API_BASE_URL}/ProductDetails1/getById/${_id}`).then((response) => {
      setProductDetailsList(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  console.log("ProductDetailsList", ProductDetailsList)

  // <------------ Add To Cart Products Details --------->
  const AddProductDetails = async (e) => {
    e.preventDefault();
    const StoredToken = localStorage.getItem('token')
    if (!StoredToken) {
      alert("User Not sign In")
      navigate("/Login")
    }
    const headers = {
      Authorization: ` ${StoredToken}`
    }
    // <------------ Size Activate Variable------------>
    const sizeLabels = ["S", "M", "X", "XL"];
    const selectedSize = sizeLabels[ActiveSize];
    const dataToSend = {
      ProductDetailsList,
      selectedSize,
      AddQuntity
    };
    console.log("StoredToken", StoredToken)
    await axios.post(`${API_BASE_URL}/ProductAddToCart/post`, dataToSend, { headers }).then((response) => {
      const { data } = response;
      const { token: newToken } = data.data;
      localStorage.setItem('token', newToken)
      alert("Successfully Add the Item")
    }).catch((error) => {
      // console.log(error)
      if(error.response && error.response.status === 409){
        alert("Item already exists in the cart")
      }else{
        console.log("Error adding item to cart:", error);
      }
    })
  }

  // <---------- Add To Wish List --------------------->
  const AddWishLsit = async(e)=>{
    e.preventDefault();
    const StoredToken = localStorage.getItem('token')
    if (!StoredToken) {
      alert("User Not sign In")
      navigate("/Login")
    }
    const headers = {
      Authorization: ` ${StoredToken}`
    }
    await axios.post(`${API_BASE_URL}/ProductAddWishList/post`,{ProductDetailsList},{ headers }).then((response)=>{
      const { data } = response;
      // const { token: newToken } = data.data;
      // localStorage.setItem('token', newToken)
      alert("Successfully Add To the WishList")
    }).catch((error)=>{
      if(error.response && error.response.status === 409){
        alert("Product already exists in the Wish List")
      }
      else{
        console.log("Error adding item into the Wish List:", error);
      }
    })
  }

  useEffect(() => {
    GetProductDetails();
  }, [_id])


  return (
    <div>
      <div>
        {/* This is Header Section here */}
        <NewHeader />

        <div class="category-section">
          <div class="category-menu-bg">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <ul class="nav product-menu">
                    <li class="nav-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a href="#">Product</a>
                    </li>
                    <li class="nav-item">
                      <a href="#">Top</a>
                    </li>
                    <li class="nav-item">
                      <a href="#">Kurtis</a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="category-tabs">
            <div class="container">
              <div class="row">
                <div class="col-sm-6 col-md-8 col-lg-8">
                  <div class="prodct-det-img">
                    <img src={`${IMG_BASE_URL}${ProductDetailsList.images}`} class="img-fluid"
                      style={{ width: "400px", height: "400px", textAlign: "center" }} alt="" />
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="prodct-det-img">
                        <img src={`${IMG_BASE_URL}${ProductDetailsList.sub_images1}`} class="img-fluid w-50" alt="" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="prodct-det-img" style={{ textAlign: "center" }}>
                        <img src={`${IMG_BASE_URL}${ProductDetailsList.sub_images2}`} class="img-fluid w-50" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <div class="product-details-info">
                    <h4 class="detail-heading">{ProductDetailsList?.title}</h4>
                    <h6 class="detail-sub-heading">{ProductDetailsList?.Created_By}</h6>

                    <div class="product-price-section">
                      <div class="product-price">
                        <h6>₹ {ProductDetailsList?.After_Price} | <span><del>₹{ProductDetailsList?.Before_Price}</del></span> </h6>
                        <div class="discount">({ProductDetailsList?.Discount_Percentage})</div>
                      </div>
                      <div class="product-price">
                        <ul class="nav">
                          <li><a href="#"><svg width="14" height="13" viewBox="0 0 14 13"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7
                             9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" fill="#FEC403" />
                          </svg>
                          </a></li>
                          <li><a href="#"><svg width="14" height="13" viewBox="0 0 14 13"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145
                             12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z"
                              fill="#FEC403" />
                          </svg>
                          </a></li>
                          <li><a href="#"><svg width="14" height="13" viewBox="0 0 14 13"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145
                             12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604
                              4.83688H5.4284L7 0Z" fill="#FEC403" />
                          </svg>
                          </a></li>
                          <li><a href="#"><svg width="14" height="13" viewBox="0 0 14 13"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 
                            9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" fill="#FEC403" />
                          </svg>
                          </a></li>
                          <li><a href="#"><svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" fill="#C4C4C4" />
                          </svg>

                          </a></li>
                          <li>See</li>
                        </ul>
                      </div>
                    </div>
                    <div class="select-size">
                      <h6 class="selectsize">Select Size &nbsp; <span class="short-size"> Size Chart <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5L0.5 9.33013L0.5 0.669872L8 5Z" fill="#47525D" />
                      </svg>
                      </span></h6>

                      <ul class="nav size-select">
                        <li className={ActiveSize === 0 ? "ActiveSize" : ""} value="S" onClick={() => HandleActiveSize(0)}>S</li>
                        <li className={ActiveSize === 1 ? "ActiveSize" : ""} value="M" onClick={() => HandleActiveSize(1)}>M</li>
                        <li className={ActiveSize === 2 ? "ActiveSize" : ""} value="X" onClick={() => HandleActiveSize(2)}>
                          X</li>
                        <li className={ActiveSize === 3 ? "ActiveSize" : ""} value="XL" onClick={() => HandleActiveSize(3)}>
                          XL</li>
                      </ul>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="cart-btn" onClick={AddProductDetails}>
                          <Link >
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.3335 15C16.3335 15.4602 15.9604 15.8333 15.5002 15.8333C15.0399 15.8333 14.6668 15.4602 14.6668 15C14.6668 14.5398 15.0399 14.1667 15.5002 14.1667C15.9604 14.1667 16.3335 14.5398 16.3335 15Z" stroke="#47525D" stroke-width="1.66667" />
                              <path d="M11.3335 15C11.3335 15.4602 10.9604 15.8333 10.5002 15.8333C10.0399 15.8333 9.66683 15.4602 9.66683 15C9.66683 14.5398 10.0399 14.1667 10.5002 14.1667C10.9604 14.1667 11.3335 14.5398 11.3335 15Z" stroke="#47525D" stroke-width="1.66667" />
                              <path d="M6.53133 5.83332H14.7716C15.6894 5.83332 16.4893 6.45792 16.7119 7.34825L17.6892 11.2575C17.847 11.8886 17.3696 12.5 16.7191 12.5H8.74809C8.30693 12.5 7.91789 12.2109 7.79061 11.7885L5.92281 5.58965C5.66826 4.74484 4.89017 4.16666 4.00785 4.16666H2.1665" stroke="#47525D" stroke-width="1.66667" />
                              <path d="M7.1665 9.16666H17.1665" stroke="#47525D" stroke-width="1.66667" />
                            </svg>
                            Add to Cart</Link>
                        </div>
                        {/* <Cart addToCart={addToCart} cartItems={initialCartItems} /> */}

                      </div>
                      <div class="col-md-6">
                        <div class="cart-btn wishlist-btn" onClick={AddWishLsit}><Link><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.5373 4.41451L11.5441 4.408L11.5507 4.40134C12.9016 3.04161 15.1236
                           2.99586 16.4677 4.39199C17.8439 5.82131 17.8439 8.15131 16.4677 9.58063L10.6002 15.675C10.2724 16.0154 9.72732 16.0154 9.39952 15.675L3.53194 9.58063C2.1558 8.15131 2.1558 5.82131 3.53194 4.39199C4.89096 2.98045 7.08081 2.98045 8.43983 4.39199C8.44376 4.39608 8.44779 4.40026 8.4519 4.40454C8.65088 4.61143 9.05455 5.03115 9.64166 5.14555C10.326 5.27889 10.9615 4.9686 11.5373 4.41451Z" stroke="#47525D" stroke-width="1.66667" />
                        </svg>
                          Add to Wishlist</Link></div>
                      </div>
                    </div>

                    <div class="product-description">
                      <h4 class="detail-heading">Description</h4>
                      <p class="sub-description">{ProductDetailsList?.Description}</p>


                      <p><strong>SKU:</strong> KUR-OCT-17-15</p>
                      <p><strong>Color:</strong> White</p>
                      <p><strong>STYLE: </strong>Front Slit</p>
                      <p><strong>Material / Fabric:</strong>	Pure Linen</p>
                      <p><strong>Product Category:</strong>	Kurti</p>
                      <p><strong>Product care:</strong> We recommend first time dry
                        clean then try hand-washing in cold water using mild detergent. Do not
                        tumble dry. Do not bleach. For better
                        maintenance use calendaring instead of ironing.</p>
                    </div>
                    <p><strong>Shipping:</strong>	Delivery in 6-8 days</p>
                    <p><strong>Disclaimer:</strong>	Product color may slightly vary due to
                      photographic lighting sources or your monitor settings.</p>
                    <p><strong>Cancellation:</strong>	If unfortunately you have to cancel an order,
                      please do so within 24 hours of placing the order by emailing us at
                      Colorauction@gmail.com mentioning your order number and reason for cancellation.</p>
                    <p><strong>Our Exclusivity:</strong>	This garment comes with upto 3 inch extra margins
                      providing enough room for adjustment in case of any size issue.</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <---------- Footer section -----------> */}
      <Footer />
    </div>


  )
}

export default ProductDetails