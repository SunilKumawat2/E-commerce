import React, { useEffect, useState } from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import moment from "moment"
import Footer from '../../Footer';
const Blogdetails = () => {
  const { _id } = useParams();
  const [BlogDetails, setBlogDeatils] = useState({});

  const GetBlogDeatils = async () => {
    await axios.get(`${API_BASE_URL}/Blog/getById/${_id}`).then((response) => {
      setBlogDeatils(response.data.data)
    }).catch((error) => [
      console.log(error)
    ])
  }
  console.log("BlogDetails", BlogDetails)
  useEffect(() => {
    GetBlogDeatils();
  }, [_id])

  return (
    <div>
      <div>
        {/* This is Header Section here */}
        <NewHeader />
        <div class="all-blog-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="blog-box text-center"> <img src={`${IMG_BASE_URL}${BlogDetails?.images}`} class="img-fluid" style={{ width: "65%", marginTop: "70px", borderRadius: "12px", objectFit: "contain" }} alt="" />
                  <div class="blog-conent">
                    <div class="blog-footer">
                      <h6>
                        {moment(
                          BlogDetails?.createdAt
                        ).format(
                          "(DD/MM/YYYY)"
                        )}
                      </h6>
                    </div>
                    <h5>{BlogDetails?.title}</h5>
                    <p>{BlogDetails?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     {/* <-------- Footer section ---------> */}
     <Footer/>
    </div>
  )
}

export default Blogdetails