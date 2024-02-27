import React, { useEffect, useState } from 'react';
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import { Link } from 'react-router-dom';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import Footer from '../../Footer';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import axios from 'axios';
const Product = () => {
  const itemsPerPage = 8; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [ProductList,setProductList] = useState([])
  const [ProductDetailsList,setProductDetailsList] = useState([])

  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    // Calculate total pages based on the number of products
    setTotalPages(Math.ceil(ProductDetailsList.length / itemsPerPage));
  }, [ProductDetailsList]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // <------------- fetch the Products List --------------->
  const fetchProductList = async()=>{
   await axios.get(`${API_BASE_URL}//Product/get`).then((response)=>{
    setProductList(response.data.data)
   }).catch((error)=>{
    console.log(error)
   })
  }

  // <------------- fetch the Products Details List --------------->
  const fetchProductDetails = async(_id)=>{
   await axios.get(`${API_BASE_URL}/ProductDetails/getById/${_id}`).then((response)=>{
    setProductDetailsList(response.data.data.ProductDetailsList)
   }).catch((error)=>{
    console.log(error)
   })
  }

  // <------------- fetch the All Products Details List --------------->
  const fetchProductAllDetails = async(_id)=>{
   await axios.get(`${API_BASE_URL}/ProductDetails/get`).then((response)=>{
    setProductDetailsList(response.data.data)
   }).catch((error)=>{
    console.log(error)
   })
  }

 
  useEffect(() => {
    fetchProductList();
    fetchProductAllDetails()
  }, [])
  

  const HandleActiveTab = (tabId) => {
    setActiveTab(tabId)
  }
  return (
    <div>
      {/* This is Header Section here */}
      <NewHeader />
      <div class="category-section">
        <div class="category-menu-bg">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <ul class="nav nav-tabs category-blousers ProductListul" id="myTab" role="tablist">
                  <li className='nav-item-ProductList AllProducts' role="presentation">
                    <button className='nav-link activeLink' id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      onClick={() => fetchProductAllDetails()}
                      type="button"
                      role="tab"
                      aria-controls="home">All Product

                    </button>
                  </li>
                  {
                    ProductList?.map((ProductListResult) => {
                      return (
                        <li key={ProductListResult?._id} className={`nav-item ProductList`} role="presentation">
                          <button
                            className={`nav-link ${activeTab === ProductListResult?._id ? "activeLink" : ""}`}
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected={activeTab === ProductListResult?._id}
                            onClick={() => {
                              HandleActiveTab(ProductListResult?._id);
                              fetchProductDetails(ProductListResult?._id);
                            }}
                          >
                            {ProductListResult?.title}
                          </button>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="category-tabs">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="tab-content" id="myTabContent">

                  <div class="tab-pane fade show active" id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab">
                    <div class="shart-category">
                      {
                        ProductDetailsList?.slice(startIndex, endIndex)?.map((ProductDetailResult) => {
                          return (
                            <>
                              <div class="sub-categoyr-box">
                                <div class="box13"> <img class="pic-1"
                                  src={`${IMG_BASE_URL}${ProductDetailResult?.images}`}
                                  style={{ width: "100%", height: "300px" }} />
                                  <div class="box-content">
                                    <div class="product-info">
                                     
                                      <div class="product-hover-info">
                                        <h3 class="title">{ProductDetailResult?.title}</h3>
                                        <img class="pic-1"
                                          src={`${IMG_BASE_URL}${ProductDetailResult?.images}`}
                                          style={{ width: "100%", height: "100px" }} />
                                        <Link to={`/Product-Details/${ProductDetailResult?._id}`}
                                          class="show-btn">
                                          Details</Link> </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }

                    </div>
                    <div className='ProductPagination'>
                      <Stack spacing={2} justifyContent="center">
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={handlePageChange}
                          variant="outlined"
                          color="primary"
                          renderItem={(item) => (
                            <PaginationItem component="div" {...item} />
                          )}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <----------- Footer section ------------> */}
      <Footer />
    </div>
  )
}

export default Product