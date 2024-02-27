import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import Footer from '../../Footer';
import axios from "axios"
import { API_BASE_URL, IMG_BASE_URL } from "../../../config/Config";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
const Profile = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    last_Name: "",
    dob: "",
    images: "",
  });

  const token = localStorage.getItem("token")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [last_Name, setLast_Name] = useState("")
  const [dob, setDob] = useState("")
  const [images, setImages] = useState("")
  // <--------------- UseState For the Add Address -------------->
  const [description,setDescription] = useState("")
  const [place,setPlace] = useState("")
  
// <--------------- Address List ----------------------->
const [AddressList,setAddressList] = useState([]) 
  // <--------------- Modals fro the Add Address ----------------->
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleActiveTab = (tabId) => {
    setActiveTab(tabId)
  }

  // <-------------- Add Address ----------------->
  const HandleAddAdress = async (e) => {
    e.preventDefault();
    const StoredToken = localStorage.getItem('token');
    if (!StoredToken) {
      alert("User Not sign In");
      return;
    }
  
    const headers = {
      Authorization: `${StoredToken}`,
    };
  
    const SendData = {
      place,
      description,
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/AddAddress/post`, SendData, { headers });
      console.log(response);
      setPlace("")
      setDescription("")
      GetAddress();
    } catch (error) {
      console.log(error);
    }
  };

  // <--------------- Fetch the Address------------->
  const GetAddress = async()=>{
    const StoredToken = localStorage.getItem('token')
		if (!StoredToken) {
			console.log("No Token Provided the User")
		}
		const headers = {
			Authorization: ` ${StoredToken}`
		}
 await axios.get(`${API_BASE_URL}/AddAddress/get`,{headers}).then((response)=>{
setAddressList(response.data.data)
 }).catch((error)=>{
  console.log(error)
 })
  }

  // <---------------- Delete the address ------------------>
  const DeleteAddress = async(_id)=>{
    await axios.delete(`${API_BASE_URL}/AddAddress/delete/${_id}`).then((response)=>{
     console.log(response)
     GetAddress();
    }).catch((error)=>{
      console.log(error)

    })
  }
  
  console.log("AddressList",AddressList)
  // <--------- 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          // Handle the case where the token is not available
          console.error('Authentication token not found.');
          return;
        }

        // Make a request to your server to get user details
        const response = await axios.get(`${API_BASE_URL}/user/get/login`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Update the component state with user details
        setUserData(response.data.data.userData);
        setName(response.data.data.userData.name);
        setEmail(response.data.data.userData.email);
        setPhone(response.data.data.userData.phone);
        setLast_Name(response.data.data.userData.last_Name);
        setDob(response.data.data.userData.dob);

      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchUserData method when the component mounts
    fetchUserData();
    GetAddress();
  }, []);
  //  <--------- Update User Details Methods ------------>
  const UpdateUserDetailsHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("last_Name", userData.last_Name);
    formData.append("phone", userData.phone);
    formData.append("dob", userData.dob);
    formData.append("images", userData.images);
    if (!token) {
      // Handle case where token is not present
      console.error("Token not found");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/user/edit/login`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>

      {/* This is Header Section here */}
      <NewHeader />
      <div class="category-section">
        <div class="category-tabs pt-0">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <ul class="nav nav-tabs cart-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === 'home' ? 'activeLink' : ''}`} id="home-tab" data-bs-toggle="tab"
                      data-bs-target="#home" type="button" role="tab" aria-controls="home"
                      aria-selected={activeTab === 'home'} onClick={() => handleActiveTab('home')}>Profile</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === "profile" ? 'activeLink' : ''}`} id="profile-tab" data-bs-toggle="tab"
                      data-bs-target="#profile" type="button" role="tab"
                      aria-controls="profile" aria-selected={activeTab === "profile"}
                      onClick={() => handleActiveTab("profile")}>My Address</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === "contact" ? 'activeLink' : ''}`} id="contact-tab" data-bs-toggle="tab"
                      data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                      aria-selected={activeTab === "contact"}
                      onClick={() => handleActiveTab("contact")}>My Order</button>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <div className={`tab-pane fade show ${activeTab === 'home' ? 'active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                  <form onSubmit={UpdateUserDetailsHandler} class="order-product">
                    <div class="row">
                      <div class="col-3 col-lg-1">
                        <div class="shipping-form">
                          <img src={`${IMG_BASE_URL}${userData?.images}`}
                            style={{ width: "50px", height: "50px", borderRadius: "50px" }} />

                        </div>
                      </div>
                      <div class="col">
                        <div class="shipping-form">
                          <input type="text" value={userData?.name} name='name'
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            placeholder="First Name" class="form-control" />
                        </div>
                      </div>
                      <div class="col">
                        <div class="shipping-form">
                          <input type="text" value={userData.last_Name} name='last_Name'
                            onChange={(e) => setUserData({ ...userData, last_Name: e.target.value })}
                            placeholder="Last Name" class="form-control" />
                        </div>
                      </div>
                    </div>
                    <div class="row left-space-pro">

                      <div class="col-12 col-md-6">
                        <div class="shipping-form">
                          <input type="email" value={userData?.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            name='email'
                            placeholder="tarun.satpathy@gmail.com" class="form-control" />
                          <span>Change</span> </div>
                      </div>
                      <div class="col-12 col-md-6">

                        <div class="shipping-form">
                          <input type="phone" value={userData?.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            name='phone' placeholder="+91 9998279090" class="form-control" />
                        </div>
                      </div>
                    </div>
                    <div class="row left-space-pro">
                      <div class="col-12 col-md-6">
                        <div class="shipping-form">
                          <input type="date" class="form-control" value={userData?.dob} name='dob'
                            onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />

                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="row">

                          <div class="col-12">
                            <div class="shipping-form">
                              <input type="file" name='images'
                                //  onChange={(e) => setImages(e.target.files[0])}
                                onChange={(e) => setUserData({ ...userData, images: e.target.files[0] })}
                                placeholder="Upload Image" class="form-control" />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="shipping-form">
                              <input type="submit" value="Update" class="show-btn order-carts  mt-0" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col"> </div>
                    </div>
                  </form>
                </div>

                <div className={`tab-pane fade show ${activeTab === 'profile' ? 'active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div class="row">
                    <div class="col-6 col-md-6">
                      <h5 class="category-heading-title profile-address pb-0">My Addresses</h5>
                    </div>
                    <div class="col-6 col-md-6 text-end">
                      <h5 onClick={handleShow} style={{ cursor: "pointer" }} class="category-heading-title profile-address pb-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0H10V8H18V10H10V18H8V10H0V8H8V0Z" fill="#47525D" />
                        </svg>
                        Add Address</h5>
                      {/* <------------- Add Address Form Modals */}

                      <Modal show={show} onHide={handleClose} className='AddAddressModal'>
                        <Modal.Header className='btn btn-warning' closeButton>
                          <Modal.Title >Add Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='Address_Modal_Body'>
                          <form  onSubmit={HandleAddAdress} >
                            <div className='Address_Modal_Body_input'>
                              <input type='text' name='place' value={place} onChange={(e)=>setPlace(e.target.value)} placeholder='Enter The Place' />
                            </div>
                            <div className='Address_Modal_Body_input'>
                              <textarea name='description' value={description} 
                              onChange={(e)=>setDescription(e.target.value)} placeholder='About The Place'></textarea>
                            </div>

                            <div>
                              <button type='submit' onHide={handleClose} className='btn btn-warning mt-3' style={{ width: '30%' }}>Add Address</button>

                            </div>
                          </form>
                        </Modal.Body>

                      </Modal>


                    </div>
                  </div>
                  {/* <-------------- List of the Address------------> */}
                  {
                    AddressList?.map((AddressListResult)=>{
                      return(
                        <>
                         <div class="order-product p-0">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="cart-valus m-0">
                          <h5>{AddressListResult?.place}</h5>
                          <p class="m-0">{AddressListResult?.description}</p>
                        </div>
                      </div>
                      <div class="col-md-6 d-flex align-items-end text-end">
                        <div class="cart-valus address-edit m-0">
                        <MdDelete onClick={()=>DeleteAddress(AddressListResult?._id)} style={{fontSize:"25px",cursor:"pointer",marginLeft:"20px"}}/>
                        <CiEdit style={{fontSize:"25px",cursor:"pointer",marginLeft:"20px"}}/>
                        

                        </div>
                      </div>
                    </div>
                  </div>
                        </>
                      )
                    })
                  }
                 
                  {/* <div class="order-product p-0">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="cart-valus m-0">
                          <h5>Office</h5>
                          <p class="m-0">Sec 5, GandhiBhavan, Nr Iffco Chowk, Gurgaon, New Delhi, 400034</p>
                        </div>
                      </div>
                      <div class="col-md-6 d-flex align-items-end text-end">
                        <div class="cart-valus address-edit m-0">
                          <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41157 7.84315L7.84364 4.41091L6.64859 3.21581C6.36086 2.92806 5.89435 2.92806 5.60662 3.21581L3.21647 5.60607C2.92876 5.89379 2.92876 6.36027 3.21647 6.648L4.41157 7.84315ZM19.284 15.8516L8.41572 4.98287L7.27169 6.12695L18.1399 16.9957L18.7119 18.7118L16.9959 18.1398L6.12766 7.27103L4.98364 8.4151L16.4239 19.8559L21 21L19.284 15.8516Z" fill="#47525D" />
                          </svg>
                          </a>
                          <a href="#"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2H3L5 0H9L11 2H14V4H0V2Z" fill="#47525D" />
                            <path d="M9.91699 4.78571V13.3571" stroke="#47525D" />
                            <path d="M4.55957 4.78571V13.3571" stroke="#47525D" />
                            <path d="M7.23828 4.78571V13.3571" stroke="#47525D" />
                            <path d="M13 5V14C13 14.5523 12.5523 15 12 15H2C1.44771 15 1 14.5523 1 14V5" stroke="#47525D" stroke-width="2" />
                          </svg>
                          </a>

                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className={`tab-pane fade show ${activeTab === 'contact' ? 'active' : ''}`} id="contact" role="tabpanel" aria-labelledby="contact-tab">
                  <div class="order-table table-responsive">
                    <table class="order-cart-table" width="100%" border="0" cellspacing="0" cellpadding="15">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Item</th>
                        <th scope="col">Item Qty</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">&nbsp;</th>
                      </tr>
                      <tr>
                        <td>Bb123000234</td>
                        <td>22/01/2022</td>
                        <td>White Linen Embroidered A-Line Kurti</td>
                        <td>1</td>
                        <td>Rs.1899</td>
                        <td>Shipped</td>
                        <td><a href="#">Track</a></td>
                      </tr>
                      <tr>
                        <td>Bb123000234</td>
                        <td>22/01/2022</td>
                        <td>White Linen Embroidered A-Line Kurti</td>
                        <td>2</td>
                        <td>Rs.1899</td>
                        <td>Shipped</td>
                        <td><a href="#">Track</a></td>
                      </tr>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <--------- Footer section ------------> */}
      <Footer />
    </div>
  )
}

export default Profile