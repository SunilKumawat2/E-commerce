import React, { useEffect, useRef } from "react";
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import banner1 from "../../../assets/images/banner.jpeg";
import product2 from "../../../assets/images/product2.png";
import product3 from "../../../assets/images/product3.png";
import product4 from "../../../assets/images/product4.png";
import product5 from "../../../assets/images/product5.png";
import sale1 from "../../../assets/images/sale1.png";
import sale2 from "../../../assets/images/sale2.png";
import sale3 from "../../../assets/images/sale3.png";
import { FaArrowRightLong } from "react-icons/fa6";
import greatdeals from "../../../assets/images/great-deals.png";
import { Link } from 'react-router-dom';
import Header from '../../header/Header';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../Footer';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import videoSource from "../../../assets/videos/OnlineShopingVideo.mp4";
import bgVideos from "../../../assets/videos/bgvideos.mp4"
import moment from 'moment';
const Home = () => {
    const videoEl = useRef(null);

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        attemptPlay();
    }, []);
    const [BlogList, setBlogList] = useState([]);
    const GetBlogList = async () => {
        await axios.get(`${API_BASE_URL}/Blog/get`).then((response) => {
            setBlogList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        GetBlogList();
    }, [])
    const banner1Design = {
        backgroundImage: `url(${banner1})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    const images = [
        product2,
        product2,
        product3,
        product4,
        product5,
        product5,
        product5,
    ];
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <div>
            <div className="header-bg-banner background-video">
            <video autoPlay loop muted>
                <source src={bgVideos} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
                <Header />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-10 col-xl-8 mx-auto text-center">
                            <div className="slider-content">

                                <div className="bebe-bunny-sub">
                                    <div className="slider-sub-title">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div >

            <div className="feature-section">
                <div>
                    <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-7 mx-auto text-center">
                            <div className="featured-heading">
                                <h1 className="heading-title">Feature Product</h1>
                                <p className="sub-heading">Lorem Ipsum is simply dummy
                                    text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                    type and scrambled it to make a type specimen book.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="carousel featured-product-list">
                                {/* <!-- BEGIN CONTAINER --> */}
                                <div className="featured-banner">
                                    <section className='container featured-ProductList1'>
                                        <div>
                                            <p>
                                                <Slider {...settings}>
                                                    {images?.map((image, index) => (
                                                        <div key={index}>
                                                            <Link to="/Product-Details/:_id">
                                                            <img  src={image} alt={`Image ${index + 1}`} />
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </p>
                                        </div>
                                    </section>
                                </div>


                            </div>
                            {/* <!-- The Modal --> */}
                            <div className="youtub-bg"
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="youtub-content">
                                                <video
                                                   className="photo-item__video"
                                                    playsInline
                                                    loop
                                                    muted
                                                    alt="All the devices"
                                                    src={videoSource}
                                                    ref={videoEl}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal" id="myModal">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            {/* <!-- Modal body --> */}
                                            <div className="modal-body p-0">
                                                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/xY3Ug6_3WXU?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div>
                                            {/* <!-- Modal footer --> */}
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sale-bg-section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-2 text-center text-md-start text-lg-start my-auto">
                                            <div className="featured-heading sale-content">
                                                <h1 className="heading-title">Sale</h1>
                                                <p className="sub-heading">Summar 2022</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="sale-banner"> <img src={sale1}
                                                className="img-fluid" alt="" /> </div>
                                        </div>
                                        <div className="col">
                                            <div className="sale-banner2"> <img src={sale2}
                                                className="img-fluid" alt="" /> </div>
                                        </div>
                                        <div className="col">
                                            <div className="sale-banner3"> <img src={sale3}
                                                className="img-fluid" alt="" /> </div>
                                        </div>
                                        <div className="col-md-12 text-center  text-md-end mt-4">
                                            <a className="view-all-btn" href="#">View All
                                                <svg width="25" height="20" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M31.0607 13.0607C31.6464 12.4749 31.6464 11.5251 31.0607 10.9393L21.5147 1.3934C20.9289 0.807611 19.9792 0.807611 19.3934 1.3934C18.8076 1.97919 18.8076 2.92893 19.3934 3.51472L27.8787 12L19.3934 20.4853C18.8076 21.0711 18.8076 22.0208 19.3934 22.6066C19.9792 23.1924 20.9289 23.1924 21.5147 22.6066L31.0607 13.0607ZM0 13.5H30V10.5H0V13.5Z" fill="black" />
                                                </svg>
                                            </a> </div>
                                    </div>
                                </div>
                            </div>

                            <div className="blog-section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6 col-md-6">
                                            <div className="blog-heading">
                                                <h4>Recent Blog posts</h4>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-6 text-end">
                                            <div className="blog-heading">
                                                <h4><Link to="Blog">View All Blogs <FaArrowRightLong /></Link></h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            BlogList?.slice(0, 3)?.map((BlogListResult) => {
                                                return (
                                                    <>
                                                        <div className="col-sm-6 col-md-4">
                                                            <div className="blog-box"> <img style={{ width: "300px", height: "300px" }} src={`${IMG_BASE_URL}${BlogListResult?.images}`}
                                                                className="img-fluid w-100" alt="" />
                                                                <div className="blog-conent">
                                                                    <h5>{BlogListResult?.title}</h5>
                                                                    <p>{BlogListResult?.short_description}</p>
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <div className="blog-footer">
                                                                                <h6><Link to={`/Blog-details/${BlogListResult?._id}`}>See More</Link></h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-6 text-end">
                                                                            <div className="blog-footer">
                                                                                <h6> {moment(
                                                                                    BlogListResult?.created_at
                                                                                ).format("DD-MM-YYYY")}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }

                                        {/* <div className="col-sm-6 col-md-4">
                                            <div className="blog-box"> <img src={blog2}
                                                className="img-fluid w-100" alt="" />
                                                <div className="blog-conent">
                                                    <h5>Wardrobe Black Floral Lace Dress...</h5>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="blog-footer">
                                                                <h6><a href="blog-details.html">See More</a></h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 text-end">
                                                            <div className="blog-footer">
                                                                <h6>12/12/2021</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="blog-box"> <img src={blog3}
                                                className="img-fluid w-100" alt="" />
                                                <div className="blog-conent">
                                                    <h5>Wardrobe Black Floral Lace Dress...</h5>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="blog-footer">
                                                                <h6><a href="blog-details.html">See More</a></h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 text-end">
                                                            <div className="blog-footer">
                                                                <h6>12/12/2021</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="blog-section">
                                <div className='blog-section_container'>
                                    <section className='featured-ProductList2'>
                                        <div>
                                            <p>
                                                <Slider {...settings1}>
                                                    {images.map((image, index) => (
                                                        <div key={index}>
                                                            <img src={image} style={{ width: "95%" }} alt={`Image ${index + 1}`} />
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="greate-section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 my-auto">
                                            <div className="greate-deals">
                                                <h2>Great Deals!</h2>
                                                <h5>Launch Offer</h5>
                                                <p>Get Flat off</p>
                                                <ul className="nav d-flex">
                                                    <li>10%</li>
                                                    <li>15%</li>
                                                    <li>20%</li>
                                                </ul>
                                                <h6>Terms and condition applied.</h6>
                                                <a href="#" className="show-btn">Show now</a> </div>
                                        </div>
                                        <div className="col-sm-6 col-md-8 col-lg-9 col-xl-9">
                                            <div className="greate-dealss"> <img src={greatdeals}
                                                className="img-fluid" alt="" /> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="world-section">
                                <div className="world-boxes">
                                    <h5>Worldwide Shipping</h5>
                                    <p>We have provide worldwide shipping, so that you don’t miss on your favourite
                                        styles!</p>
                                </div>
                                <div className="world-boxes world-two">
                                    <h5>Best Quality</h5>
                                    <p>After receiving your order, we conduct rigorous Quality Control checks and tests in order to ensure the product's quality prior to shipment to meet your satisfaction </p>
                                </div>
                                <div className="world-boxes world-two">
                                    <h5>Best Offers</h5>
                                    <p>We strive to offer the best shopping experience</p>
                                </div>
                                <div className="world-boxes">
                                    <h5>Secure Payments</h5>
                                    <p>Any worries? Our 24/7 customer service is always here to help. You can easily find out our friendly customer advisor by Facebook live chat, Twitter, Instagram, email or phone.</p>
                                </div>
                            </div>

                            <div className="blog-section">
                                <div className='blog-section_container'>
                                    <section className='featured-ProductList2'>
                                        <div>
                                            <p>
                                                <Slider {...settings1}>
                                                    {images.map((image, index) => (
                                                        <div key={index}>
                                                            <img src={image} style={{ width: "95%" }} alt={`Image ${index + 1}`} />
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            {/* <-------- Footer section ---------> */}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home