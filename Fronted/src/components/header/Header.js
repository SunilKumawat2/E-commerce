import React, { useEffect, useState } from 'react';
import $ from 'jquery'; // Import jQuery
import "../../assets/css/style.css"
import "../../assets/css/responsive.css"
import "../../assets/css/bootstrap.min.css";
import { Link, useLocation } from 'react-router-dom';
import Logos from "../../assets/images/logos.png";
const Header = () => {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('is_Login') === 'true';
  const activeLink = ["/", "/Product", "/About", "/Blog", "/Contact", "/Login", "/Register", "/Cart"]
    .indexOf(location.pathname)
  const customScrollHeight = {
    '--bs-scroll-height': '100px',
  };
  const GetLogOut = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("is_Login")
    setIsUserAuthenticated(false);

  }
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(localStorage.getItem('is_Login') === 'true');

  

  const handleLogin = async () => {
    // Perform your login logic
    // After successful login, update the authentication status
    localStorage.setItem('is_Login', 'true');
    setIsUserAuthenticated(true);
    // Other logic, e.g., redirection
  };

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 50) {
        $('#navbar_top').addClass('fixed-top');
        const navbarHeight = $('.navbar').height();
        document.body.style.paddingTop = `${navbarHeight}px`;
      } else {
        $('#navbar_top').removeClass('fixed-top');
        document.body.style.paddingTop = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div>
      <div className="header-section">
        <div id="navbar_top">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="logo-left"> <Link className="navbar-brand" to="/">
                <img src={Logos} style={{ width: "130px", height: "50px" }} alt='logos' />
              </Link> </div>
              <button className="navbar-toggler show-btn-menu collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"><svg x="0px" y="0px"
                width="20" height="20"
                viewBox="0 0 50 50"
                style={{ fill: "#000000" }}><path d="M 0 7.5 L 0 12.5 L 50 12.5 L
                                     50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"></path></svg></span><span className="close-nav-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11
                                         11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                  <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0
                                         .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                </svg></span></button>
              <div className="ms-auto">
                <div className="collapse navbar-collapse menu-all" id="navbarScroll">
                  <ul className="navbar-nav navbar-nav-scroll"
                    style={customScrollHeight}>
                    <li><Link to="#">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.40297 2.18297C-0.257403 4.84334 -0.257403 9.15666 2.40297 11.817C4.94444 14.3585 8.9944 14.4721 11.6707 12.1578L15.0863 15.5734C15.2816 15.7687 15.5981 15.7687 15.7934 15.5734C15.9887 15.3781 15.9887 15.0615 15.7934 14.8663L12.3778 11.4507C14.6921 8.77438 14.5785 4.72443 12.037 2.18297C9.37667 -0.477409 5.06335 -0.477409 2.40297 2.18297ZM3.81719 10.4028C1.93786 8.52349 1.93786 5.47651 3.81719 3.59718C5.69651 1.71785 8.7435 1.71785 10.6228 3.59718C12.5022 5.47651 12.5022 8.52349 10.6228 10.4028C8.7435 12.2821 5.69651 12.2821 3.81719 10.4028Z" fill="#47525D" />
                      </svg>
                    </Link>
                    </li>
                    <li className={activeLink === 0 ? "activeLink" : ""}><Link to="/">HOME</Link></li>
                    <li className={activeLink === 1 ? "activeLink" : ""}><Link to="/Product">Product</Link></li>
                    <li className={activeLink === 2 ? "activeLink" : ""}><Link to="/About">About</Link></li>
                    <li className={activeLink === 3 ? "activeLink" : ""}><Link to="/Blog">Blog</Link></li>
                    <li className={activeLink === 4 ? "activeLink" : ""}><Link to="/Contact">Contact Us</Link></li>
                
                     {
                      !isUserAuthenticated  ? (
                        <li className={activeLink === 5 ? "activeLink" : ""}>
                        <Link onClick={handleLogin} 
                     
                         to="/Login">Login</Link>
                      </li>
                      ):(
                        <Link className={ ` Logout ${activeLink} === 5 ? "activeLink" : ""`} to="" onClick={GetLogOut}
                     
                         >
                        Logout
                      </Link>
                      )
                    } 
                    <li className={activeLink === 7 ? "activeLink" : ""}><Link to="/Cart">Cart (0)</Link></li>
                    <li className={activeLink === 7 ? 'activeLink' : ''}>
                     
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header