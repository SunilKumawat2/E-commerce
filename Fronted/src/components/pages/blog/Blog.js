import React, { useEffect, useState } from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import moment from "moment"
import Footer from '../../Footer';
const Blog = () => {
  const [BlogList, setBlogList] = useState([]);
  const GetBlogList = async () => {
    await axios.get(`${API_BASE_URL}/Blog/get`).then((response) => {
      setBlogList(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  console.log("BlogList", BlogList)
  useEffect(() => {
    GetBlogList();
  }, [])
  return (
    <div>
      {/* This is Header Section here */}
      <NewHeader />
      <div className="all-blog-section">
        <div className="all-blog-section_container">

          <div className="row">
            {
              BlogList?.map((BlogListResult) => {
                return (
                  <>
                    <div className="col-sm-6 col-md-4 mt-5 blogCart">
                      <div className="blog-box"> <img src={`${IMG_BASE_URL}${BlogListResult?.images}`}
                       className="img-fluid" style={{width:"100%",height:"60vh"}} alt="" />
                        <div className="blog-conent">
                          <h5>{BlogListResult?.title}</h5>
                          <p>{BlogListResult?.short_description}</p>
                          <div className="row">
                            <div className="col-4">
                              <div className="blog-footer">
                                <h6><Link to={`/Blog-details/${BlogListResult?._id}`}>See More</Link></h6>
                              </div>
                            </div>
                            <div className="col-6 text-end">
                              <div className="blog-footer">
                                {/* <h6>12/12/2021</h6> */}
                                <h6>
                                              {moment(
                                                BlogListResult?.createdAt
                                              ).format(
                                                "(DD/MM/YYYY)"
                                              )}
                                            </h6>
                               
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

          </div>
        </div>
      </div>

      {/*<-------------- footer Section -----------> */}
      <Footer/>
    </div>
  )
}

export default Blog