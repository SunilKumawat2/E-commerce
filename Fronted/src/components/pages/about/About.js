import React, { useEffect, useState } from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
// import "../../../assets/css/all.css";
import product1 from "../../../assets/images/product1.png";
import NewHeader from '../../NewHeader/NewHeader';
import axios from "axios";
import { API_BASE_URL, IMG_BASE_URL } from "../../../config/Config"
import Footer from '../../Footer';
const About = () => {
  const [AboutList, setAboutList] = useState([]);
  const GetAbout = async () => {
    await axios.get(`${API_BASE_URL}/About/get`).then((response) => {
      setAboutList(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  console.log("AboutList", AboutList)
  useEffect(() => {
    GetAbout()
  }, [])
  return (
    <div>
      {/* This is Header section here */}
      <NewHeader />
      <div className="category-section">
        <div className="category-tabs pt-0">
          <div className="container">
            <div className="order-product">
              <div className="row">
                {
                  AboutList.map((AboutListResult) => {
                    return (
                      <>
                        <div className="col-sm-5 col-md-4 col-lg-4">
                          <div className="about-img">
                            <img src={`${IMG_BASE_URL}${AboutListResult?.images}`}
                             style={{height:"80vh"}} className="img-fluid w-100" alt="" />
                          </div>
                        </div>
                        <div className="col-sm-7 col-md-8 col-lg-8">
                          <div className="about-info">
                            <h5>{AboutListResult?.title}</h5>
                            <p>{AboutListResult?.about}</p>
                          </div>
                        </div>
                      </>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<----------------- Footer section------------> */}
      <Footer />
    </div>
  )
}

export default About