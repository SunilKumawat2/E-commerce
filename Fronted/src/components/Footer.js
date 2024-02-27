import React from 'react'
import Logos from "../assets/images/logos.png"
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div>
            <div className="footer-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-3 text-center text-md-start text-lg-start text-xl-start">
                            <div className="footer-logo"> <Link to="/">
                                <img src={Logos} style={{ width: "130px", height: "50px" }} />
                            </Link> </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-lg-6 d-flex">
                            <div className="footer-menu ms-auto">
                                <ul className="nav">
                                    <li><Link to="/About">About Us</Link></li>
                                    <li><Link to="/Contact">Contact Us</Link></li>
                                    <li><a href="#">Refer & Earn</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="footer-social">
                                <h6>FOLLOW US</h6>
                                <ul className="nav">
                                    <li><a href="#">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8192 24.5039H1.32462C0.592836 24.5039 0 23.9107 0 23.1792V1.82851C0 1.09683 0.592929 0.503906 1.32462 0.503906H22.6755C23.407 0.503906 24 1.09683 24 1.82851V23.1792C24 23.9108 23.4069 24.5039 22.6755 24.5039H16.5597V15.2098H19.6793L20.1464 11.5877H16.5597V9.27523C16.5597 8.22655 16.8509 7.51191 18.3546 7.51191L20.2727 7.51107V4.27145C19.9409 4.22731 18.8024 4.12869 17.4778 4.12869C14.7124 4.12869 12.8192 5.81667 12.8192 8.91651V11.5877H9.69156V15.2098H12.8192V24.5039Z" fill="white" />
                                        </svg>
                                    </a></li>
                                    <li><a href="#">
                                        <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5837 4.29849C26.8127 3.54963 27.7557 2.36219 28.2 0.947677C27.0493 1.64107 25.7778 2.14551 24.4194 2.41593C23.3369 1.2389 21.7896 0.503906 20.0772 0.503906C16.7937 0.503906 14.1298 3.2168 14.1298 6.56241C14.1298 7.03738 14.1808 7.49849 14.283 7.94226C9.33815 7.68917 4.95504 5.27964 2.01878 1.60987C1.50643 2.50781 1.21365 3.54963 1.21365 4.65905C1.21365 6.76003 2.2639 8.61485 3.86054 9.70174C2.88689 9.67227 1.96772 9.39665 1.16429 8.94594V9.02048C1.16429 11.957 3.21541 14.4064 5.9389 14.9611C5.44016 15.1033 4.91419 15.1743 4.37119 15.1743C3.9882 15.1743 3.61372 15.1379 3.25116 15.0669C4.00863 17.4729 6.20444 19.2255 8.80877 19.2723C6.77296 20.8983 4.20608 21.8673 1.41962 21.8673C0.939602 21.8673 0.464694 21.8396 0 21.7841C2.63327 23.5002 5.76187 24.5039 9.12027 24.5039C20.0653 24.5039 26.0484 15.2731 26.0484 7.2662C26.0484 7.00271 26.0433 6.73923 26.0331 6.48094C27.1957 5.62633 28.2051 4.56024 29 3.34508C27.9344 3.82698 26.7872 4.15288 25.5837 4.29849Z" fill="white" />
                                        </svg>
                                    </a></li>
                                    <li><a href="#">
                                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52199 12.1389L9.52124 5.34796L16.0057 8.75512L9.52199 12.1389ZM23.76 4.17101C23.76 4.17101 23.5252 2.50552 22.806 1.7721C21.8932 0.809058 20.8703 0.804526 20.4015 0.748632C17.043 0.503906 12.0052 0.503906 12.0052 0.503906H11.9948C11.9948 0.503906 6.957 0.503906 3.5985 0.748632C3.129 0.804526 2.10675 0.809058 1.19325 1.7721C0.474 2.50552 0.24 4.17101 0.24 4.17101C0.24 4.17101 0 6.1273 0 8.08284V9.91677C0 11.8731 0.24 13.8286 0.24 13.8286C0.24 13.8286 0.474 15.4941 1.19325 16.2275C2.10675 17.1905 3.306 17.1603 3.84 17.2608C5.76 17.4466 12 17.504 12 17.504C12 17.504 17.043 17.4965 20.4015 17.2517C20.8703 17.1951 21.8932 17.1905 22.806 16.2275C23.5252 15.4941 23.76 13.8286 23.76 13.8286C23.76 13.8286 24 11.8731 24 9.91677V8.08284C24 6.1273 23.76 4.17101 23.76 4.17101Z" fill="white" />
                                        </svg>
                                    </a></li>
                                    <li><a href="#">
                                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26 24.5039H20.2536V16.0669C20.2536 13.8586 19.3548 12.351 17.3782 12.351C15.8663 12.351 15.0255 13.3683 14.6342 14.3488C14.4874 14.7007 14.5104 15.191 14.5104 15.6812V24.5039H8.8175C8.8175 24.5039 8.89088 9.55862 8.8175 8.20009H14.5104V10.7588C14.8467 9.64007 16.6658 8.04334 19.5688 8.04334C23.1704 8.04334 26 10.3885 26 15.4384V24.5039ZM3.06046 6.1604H3.02377C1.18933 6.1604 0 4.91416 0 3.33446C0 1.72402 1.22449 0.503906 3.09562 0.503906C4.96522 0.503906 6.1148 1.72095 6.15149 3.32985C6.15149 4.90954 4.96522 6.1604 3.06046 6.1604ZM0.655762 8.20021H5.72339V24.5039H0.655762V8.20021Z" fill="white" />
                                        </svg>
                                    </a></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-sm-12 col-md-4 col-lg-3 order-3 order-md-1 order-lg-1 order-xl-1">
                            <div className="footer-logo copy-rights">
                                <p>Copyright © 2024 Online Shoping </p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-lg-6 my-auto  order-2 order-md-2 order-lg-2 order-xl-2">
                            <div className="footer-menu returpolicy ms-auto">
                                <ul className="nav">
                                    <li><Link to="/ReturnPolicy">Return Policy</Link></li>
                                    <li><Link to="/Privacy-Cookies">Privacy & Cookies</Link></li>
                                    <li><Link to="/TermsUse">Terms of Use</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3  order-1 order-md-3 order-lg-3 order-xl-3">
                            <div className="footer-social border-0">
                                <h6>Powered by Bebe&bunny </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer