import React, { useEffect, useState, useRef } from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import Footer from '../../Footer';
import { API_BASE_URL, IMG_BASE_URL } from '../../../config/Config';
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import cart from "../../../assets/images/cart.png";
import Stripe from 'stripe';
const stripe = new Stripe('pk_test_51OlpYMSCNujN812W8JvB2XySpZnxYpa9q5c7YwryWArVLUWkgczDIDbb849NuVFy4gc9jqPTQ5PAH62X8q8sJOru00KFzvOAcH');
const Cart = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [activeTab, setActiveTab] = useState('home');
	const [AddCart, setAddCart] = useState([]);
	const [AddCartLength, setAddCartLength] = useState([]);
	// <--------------- Address List ----------------------->
	const [AddressList, setAddressList] = useState([])
	const [EditAddQuntity, setEditAddQuntity] = useState({})
	// <--------------- User Login Details ---------------->
	const [LoginUserData, setLoginUserData] = useState([]);
	//   <------------- Add To Cart -------------------->

	// <------------------  Address Form ---------------------->
	const [loading, setLoading] = useState(false);
	// <------------- Shiping Address Form ------------------------->
	const [ShipingAddressForm, setShipingAddressForm] = useState({
		mobile: "",
		pincode: "",
		state: "",
		city: "",
		Appartment: "",
		AddtionalAddress: "",
		Address: "",
		company: "",
		Last_Name: "",
		First_Name: ""
	})

	// <------------- Fetch the Condact Infromation ---------------->
	const [CondactInfromation, setCondactInfromation] = useState([]);

	// <------------------- Payment Form Details --------------------->
	const [CardNumber, setCardNumber] = useState()
	const [CardHolderName, setCardHolderName] = useState("")
	const [ExpirayDateYear, setExpirayDateYear] = useState()
	const [ExpirayDateMonth, setExpirayDateMonth] = useState()
	const [CVC, setCVC] = useState();


	// <----------------- Payment Form Handling Details ------------------->

	const handlePayment = async () => {
		try {
		  const token = await stripe.createToken('card', {
			CardNumber: CardNumber,
			ExpirayDateMonth: ExpirayDateMonth,
			ExpirayDateYear: ExpirayDateYear,
			CVC: CVC,
		  });
	  
		  // Send the payment details to the backend using Axios
		  await axios.post(`${API_BASE_URL}/Payment/post`, {
			token: token.id,
			amount: 1000, // Example amount
			currency: 'usd', // Example currency
			description: 'Payment for Product XYZ', // Example description
		  });
	  
		  console.log('Payment successful');
		} catch (error) {
		  console.error('Payment failed:', error);
		}
	  };
	  
	  
	  const GetPaymentFormHandlingDetails = async (e) => {
		e.preventDefault();
		console.log({ CVC, ExpirayDateMonth, ExpirayDateYear, CardHolderName, CardNumber });
		await handlePayment();
		setCVC('');
		setExpirayDateMonth('');
		setExpirayDateYear('');
		setCardHolderName('');
		setCardNumber('');
	  };
	  

	const HandleChangeShippingAddress = (e) => {
		const { name, value } = e.target;
		setShipingAddressForm(prevState => ({
			...prevState,
			[name]: value
		}));
	};


	// <----------------- Handle Shipping Address -------------------->
	const HandleShippingAddress = async (e) => {
		e.preventDefault();
		setLoading(true);
		const token = localStorage.getItem('token')
		const headers = {
			Authorization: `${token}`
		}
		const { mobile, pincode, state, city, Appartment, AddtionalAddress, Address, company, Last_Name, First_Name } = ShipingAddressForm;
		const requestData = {
			First_Name,
			Last_Name,
			mobile,
			pincode,
			state,
			city,
			Appartment,
			AddtionalAddress,
			Address,
			company
		};
		await axios.post(`${API_BASE_URL}/ShipingAddres/post`, { requestData }, { headers }).then((response) => {
			console.log("response", response)
		}).catch((error) => {
			console.log(error)
		})

		// Reset the form state
		setShipingAddressForm({
			mobile: "",
			pincode: "",
			state: "",
			city: "",
			Appartment: "",
			AddtionalAddress: "",
			Address: "",
			company: "",
			Last_Name: "",
			First_Name: ""
		});
		setLoading(false);

	}

	useEffect(() => {
	}, [EditAddQuntity])


	const handleTabClick = (tabId) => {
		setActiveTab(tabId);
	};
	// <--------------- Get The Add To Cart Products----------->
	const GetAddToCart = async () => {
		const StoredToken = localStorage.getItem('token')
		if (!StoredToken) {
			console.log("No Token Provided the User")
		}
		const headers = {
			Authorization: ` ${StoredToken}`
		}
		await axios.get(`${API_BASE_URL}/ProductAddToCart/get`, { headers }).then((response) => {
			setAddCart(response.data.data)
			setAddCartLength(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}

	// <--------------- Fetch the Address------------->
	const GetAddress = async () => {
		const StoredToken = localStorage.getItem('token')
		if (!StoredToken) {
			console.log("No Token Provided the User")
		}
		const headers = {
			Authorization: ` ${StoredToken}`
		}
		await axios.get(`${API_BASE_URL}/AddAddress/get`, { headers }).then((response) => {
			setAddressList(response.data.data)
		}).catch((error) => {
			console.log(error)
		})
	}


	useEffect(() => {
		AddCart?.map((item) => {
			setEditAddQuntity(AddQuntity => ({
				...AddQuntity,
				[item._id1]: item.AddQuntity
			}));
		})
		GetAddress()
	}, [AddCart])


	// <------------------- Delete The Add To Cart Products----------->
	const DeleteAddToCart = async (_id1) => {
		await axios.delete(`${API_BASE_URL}/ProductAddToCart/delete/${_id1}`).then((response) => {
			console.log(response)
			GetAddToCart();
		}).catch((error) => {
			console.log(error)

		})
	}

	// <------------------- Increment Quntity Function----------------->
	// Function to increment quantity
	const IncrementQuntity = (_id) => {
		setEditAddQuntity(prevState => ({
			...prevState,
			[_id]: Number((prevState[_id])) + 1
		}));
	};

	// Function to decrement quantity
	const DecrementQuntity = (_id) => {
		setEditAddQuntity(prevState => ({
			...prevState,
			[_id]: Number((prevState[_id])) - 1
		}));
	};


	// <----------------- Edit Product Add  To Cart ------------------------>
	const EditProductAddToCart = async (_id1, quantity, val, totalPrice) => {
		try {
			let updatedQuantity = quantity;
			if (val === "inc") {
				IncrementQuntity(_id1);
				updatedQuantity++;
			} else if (val === "dec") {
				DecrementQuntity(_id1);
				updatedQuantity--;
			}

			// Calculate total price based on the updated quantity and product price
			if (AddCart && typeof AddCart[0]?.After_Price === 'number' && typeof AddCart[0]?.AddQuntity === 'number') {
				// Find the object with the specified _id1
				const cartItem = AddCart?.find(item => item?._id1 === _id1);

				if (cartItem) {
					// Calculate the total price if the item is found
					totalPrice = cartItem?.After_Price * updatedQuantity;
					console.log("totalPrice", totalPrice);
				} else {
					console.log("Item with _id1", _id1, "not found in AddCart array");
				}
			} else {
				console.log("Invalid AddCart data or properties are not numbers");
			}

			const subtotal = AddCart?.reduce((acc, item) =>
				acc + (item?._id1 === _id1 ? item?.After_Price * updatedQuantity : item?.After_Price * item?.AddQuntity), 0);

			// Call the backend API with the updated quantity and total price
			await axios.put(`${API_BASE_URL}/ProductAddToCart/edit/${_id1}`,
				{ AddQuntity: updatedQuantity, TotalPrice: totalPrice, SubTotal: subtotal })
				.then((response) => {
					console.log(response.data.data);
					GetAddToCart(); // If you need to refresh the data after updating
				}).catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}


	// <---------------- Fetch the Login User email -------------------------->
	const fetchUserData = async () => {
		const StoredToken = localStorage.getItem('token')
		if (!StoredToken) {
			console.log("No Token Provided the User")
		}
		const headers = {
			Authorization: ` ${StoredToken}`
		}
		await axios.get(`${API_BASE_URL}/user/get/login`, { headers }).then((response) => {
			setLoginUserData(response.data.data.userData)
		}).catch((error) => {
			console.log(error)
		})
	}

	// <------------ fetch the Condtact Information ------------------------->
	const FetchCondtactInformation = async () => {
		const token = localStorage.getItem('token');

		const headers = {
			Authorization: ` ${token}`
		}
		await axios.get(`${API_BASE_URL}/ShipingAddres/get`, { headers }).then((response) => {
			setCondactInfromation(response.data.data)
			console.log(response.data.data)
		}).catch((error) => {
			console.log(error)
		})
	}

	const selectRef = useRef(null);

	useEffect(() => {
		if (AddressList && AddressList.length > 0) {
			// Get the width of the widest option
			const optionWidths = AddressList.map(({ description }) => {
				const tempSpan = document.createElement('span');
				tempSpan.innerText = description;
				document.body.appendChild(tempSpan);
				const width = tempSpan.offsetWidth;
				document.body.removeChild(tempSpan);
				return width;
			});
			const widestOptionWidth = Math.max(...optionWidths);

			// Set the width of the select element to the width of the widest option
			selectRef.current.style.width = `${widestOptionWidth}px`;
		}
	}, [AddressList]);

	useEffect(() => {
		GetAddToCart();
		fetchUserData();
		FetchCondtactInformation();
	}, [])

	return (
		<div>
			{/* This is Header Section here */}
			<NewHeader />
			<div class="category-section">
				<div class="category-tabs pt-0">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<ul className="nav nav-tabs cart-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button
											className={`nav-link ${activeTab === 'home' ? 'activeLink' : ''}`}
											id="home-tab"
											data-bs-toggle="tab"
											data-bs-target="#home"
											type="button"
											role="tab"
											aria-controls="home"
											aria-selected={activeTab === 'home'}
											onClick={() => handleTabClick('home')}
										>
											Cart
										</button>
									</li>
									<li className="nav-item" role="presentation">
										<button
											className={`nav-link ${activeTab === 'profile' ? 'activeLink' : ''}`}
											id="profile-tab"
											data-bs-toggle="tab"
											data-bs-target="#profile"
											type="button"
											role="tab"
											aria-controls="profile"
											aria-selected={activeTab === 'profile'}
											onClick={() => handleTabClick('profile')}
										>
											Shipping
										</button>
									</li>
									<li className="nav-item" role="presentation">
										<button
											className={`nav-link ${activeTab === 'contact' ? 'activeLink' : ''}`}
											id="contact-tab"
											data-bs-toggle="tab"
											data-bs-target="#contact"
											type="button"
											role="tab"
											aria-controls="contact"
											aria-selected={activeTab === 'contact'}
											onClick={() => handleTabClick('contact')}
										>
											Payment
										</button>
									</li>
								</ul>
							</div>
							<div class="col-md-12">
								<div class="tab-content" id="myTabContent">
									<div className={`tab-pane fade show ${activeTab === 'home' ? 'active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
										<div class="row">
											{
												AddCartLength && AddCartLength?.data && AddCartLength?.data?.length > 0 ? (
													AddCart?.map((AddCartResult) => {
														return (
															<>
																<div class="col-md-8 col-lg-7">
																	<div class="order-product">
																		<div class="cart-order-info">
																			<div class="cart-order">
																				<img style={{ width: "100%", height: "150px" }} src={`${IMG_BASE_URL}${AddCartResult?.images}`}
																					class="img-fluid" alt="" />
																			</div>
																			<div class="cart-order">
																				<div

																					class="delate-product">
																					<MdDelete onClick={() => DeleteAddToCart(AddCartResult?._id1)}
																						style={{
																							fontSize: "25px", color: "red",
																							cursor: "pointer",
																							boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
																						}} />
																				</div>
																				<h4 class="detail-heading">{AddCartResult?.title}</h4>
																				<h6 class="detail-sub-heading">{AddCartResult?.by_Created}
																				</h6>

																				<h6><strong>Size:</strong>
																					{AddCartResult?.selectedSize}</h6>
																				<h6><strong>Quantity</strong>
																					<div class="input-group number-spinner">
																						<div class="input-group-prepend">
																							<button onClick={() => {
																								EditProductAddToCart(AddCartResult?._id1,
																									EditAddQuntity[AddCartResult?._id1], "inc");
																							}} className='btn btn-warning'>+</button>
																						</div>
																						<input type="text" name='AddQuntity'
																							value={EditAddQuntity[AddCartResult._id1]}
																							onChange={(e) =>
																								setEditAddQuntity(prevState => ({
																									...prevState,
																									[AddCartResult._id]: e.target.value
																								}))}
																							class="form-control countnumber text-center" />

																						<div class="input-group-append">
																							<button onClick={() => {
																								EditProductAddToCart(AddCartResult._id1,
																									EditAddQuntity[AddCartResult._id1], "dec", EditAddQuntity[AddCartResult._id1]);
																							}} className='btn btn-warning'>-</button>

																						</div>
																					</div>
																				</h6>
																				<h6>
																					<strong>Price:</strong>
																					Rs.{AddCartResult?.After_Price * AddCartResult?.AddQuntity}
																				</h6>

																			</div>
																		</div>

																	</div>
																</div>
															</>
														)
													})
												) : (

													<span className='EmptyCartSection col-md-8 col-lg-7'>
														<img src={cart} /></span>

												)

											}

											<div class="col-md-4 col-lg-5 d-flex">
												<div class="cart-valus">
													<form>
														<h5>Subtotal <span class="total-cart">
															Rs.{AddCart?.reduce((acc, item) =>
																acc + (item?.After_Price * item?.AddQuntity), 0)}</span></h5>
														<p>Shipping, taxes, and discount codes calculated at checkout.</p>
														<div class="cart-coupon">
															<input type="text" placeholder="Coupon Code" class="form-control" />
															<input type="button" value="APPLY" class="form-control submit-btn" />
															<a href="#" class="show-btn order-carts">Order</a>
														</div>
													</form>
													{loading && <div>Loading...</div>}
												</div>
											</div>

										</div>
									</div>

									<div className={`tab-pane fade show ${activeTab === 'profile' ? 'active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
										<div class="cart-order">
											<div class="row">
												<div class="col-md-8 col-lg-7">
													<form>
														<h5 class="category-heading-title pb-0">Contact Information</h5>
														<div class="order-product">
															<div class="row">
																<div class="col-12">
																	<div class="shipping-form">
																		<input type="email"
																			value={LoginUserData?.email}
																			placeholder="Email Address"
																			disabled
																			class="form-control" />
																		<label>
																			<input type="checkbox" class="checkboxs" />
																			Keep me up to date on news and
																			exclusive offers.
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<h5 class="category-heading-title pb-0">
															Shipping Address</h5>
														{
															AddressList?.map((AddressListResult) => {
																return (
																	<>
																		<div class="order-product">
																			<div class="row">
																				<div class="col-8 col-md-7">
																					<div class="shipping-form">

																						<p class="m-0 bold-text">
																							({AddressListResult?.place})
																						</p>
																						<p class="m-0">
																							{AddressListResult?.description}
																						</p>
																					</div>
																				</div>
																				<div class="col-4 col-md-5 text-end">

																				</div>
																			</div>
																		</div>
																	</>
																)
															})
														}

													</form>
													{/* <---------------Shiping Form -----------------> */}
													<form onSubmit={HandleShippingAddress}
														class="order-product">
														<div class="row">
															<div class="col-6">
																<div class="shipping-form">
																	<input type="text"
																		value={ShipingAddressForm.First_Name}
																		name='First_Name'
																		onChange={HandleChangeShippingAddress}
																		placeholder="First Name"
																		required
																		class="form-control" />

																</div>
															</div>
															<div class="col-6">
																<div class="shipping-form">
																	<input type="text"
																		value={ShipingAddressForm.Last_Name}
																		name='Last_Name'
																		required
																		onChange={HandleChangeShippingAddress}
																		placeholder="Last Name"
																		class="form-control" />

																</div>
															</div>
															<div class="col-12">
																<div class="shipping-form">
																	<input type="text"
																		required
																		value={ShipingAddressForm.company}
																		name='company'
																		onChange={HandleChangeShippingAddress}
																		placeholder="Company ( Optional )"
																		class="form-control" />

																</div>
															</div>
															<div className="col-12">
																<div className="shipping-form">
																	<select className="form-control" name='Address'
																		onChange={HandleChangeShippingAddress}
																		required
																		value={ShipingAddressForm.Address} ref={selectRef}>
																		<option >Select Address Option</option>
																		{AddressList?.map((AddressListResult, index) => (
																			<option key={index} value={AddressListResult?.description} > <span>({AddressListResult?.place})</span> <span>{AddressListResult?.description}</span></option>
																		))}
																	</select>
																</div>
															</div>
															<div class="col-12">
																<div class="shipping-form">
																	<input type="text"
																		value={ShipingAddressForm.AddtionalAddress}
																		name='AddtionalAddress'
																		required
																		onChange={HandleChangeShippingAddress}
																		placeholder="Addtional Address (Optional)"
																		class="form-control" />

																</div>
															</div>
															<div class="col-12">
																<div class="shipping-form">
																	<input type="text"
																		value={ShipingAddressForm.Appartment}
																		name='Appartment'
																		required
																		onChange={HandleChangeShippingAddress}
																		placeholder="Apartment, Suite, etc
																		  ( Optional )"
																		class="form-control" />

																</div>
															</div>
															<div class="col-4">
																<div class="shipping-form">
																	<input type="text"
																		placeholder="City"
																		required
																		value={ShipingAddressForm.city}
																		name='city'
																		onChange={HandleChangeShippingAddress}
																		class="form-control" />

																</div>
															</div>
															<div class="col-4">
																<div class="shipping-form">
																	<input type="text"
																		placeholder="State"
																		required
																		value={ShipingAddressForm.state}
																		name='state'
																		onChange={HandleChangeShippingAddress}
																		class="form-control" />

																</div>
															</div>
															<div class="col-4">
																<div class="shipping-form">
																	<input type="number"
																		value={ShipingAddressForm.pincode}
																		name='pincode'
																		required
																		onChange={HandleChangeShippingAddress}
																		placeholder="Pincode"
																		class="form-control" />

																</div>
															</div>
															<div class="col-12">
																<div class="shipping-form">
																	<input type="number"
																		value={ShipingAddressForm.mobile}
																		name='mobile'
																		required
																		onChange={HandleChangeShippingAddress}
																		placeholder="Mobile Number"
																		class="form-control" />

																</div>
															</div>
															<div class="col-12">
																<div class="shipping-form">
																	<button type="submit" class="show-btn order-carts">
																		Continue Shipping</button>
																</div>
															</div>
														</div>
													</form>
												</div>
												<div class="col-md-4 col-lg-5">
													{
														AddCartLength && AddCartLength?.data && AddCartLength?.data?.length > 0 ? (
															AddCart?.map((AddCartResult) => {
																return (
																	<>

																		<div class="order-product">
																			<div class="cart-order-info">
																				<div class="cart-order">
																					<img style={{ width: "100%", height: "150px" }} src={`${IMG_BASE_URL}${AddCartResult?.images}`}
																						class="img-fluid" alt="" />
																				</div>
																				<div class="cart-order">
																					<div

																						class="delate-product">
																						<MdDelete onClick={() => DeleteAddToCart(AddCartResult?._id1)}
																							style={{
																								fontSize: "25px", color: "red",
																								cursor: "pointer",
																								boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
																							}} />
																					</div>
																					<h4 class="detail-heading">{AddCartResult?.title}</h4>
																					<h6 class="detail-sub-heading">{AddCartResult?.by_Created}
																					</h6>

																					<h6><strong>Size:</strong>
																						{AddCartResult?.selectedSize}</h6>
																					<h6><strong>Quantity</strong>
																						<div class="input-group number-spinner">
																							<div class="input-group-prepend">
																								<button onClick={() => {
																									EditProductAddToCart(AddCartResult?._id1,
																										EditAddQuntity[AddCartResult?._id1], "inc");
																								}} className='btn btn-warning'>+</button>
																							</div>
																							<input type="text" name='AddQuntity'
																								value={EditAddQuntity[AddCartResult._id1]}
																								onChange={(e) =>
																									setEditAddQuntity(prevState => ({
																										...prevState,
																										[AddCartResult._id]: e.target.value
																									}))}
																								class="form-control countnumber text-center" />

																							<div class="input-group-append">
																								<button onClick={() => {
																									EditProductAddToCart(AddCartResult._id1,
																										EditAddQuntity[AddCartResult._id1], "dec", EditAddQuntity[AddCartResult._id1]);
																								}} className='btn btn-warning'>-</button>

																							</div>
																						</div>
																					</h6>
																					<h6>
																						<strong>Price:</strong>
																						Rs.{AddCartResult?.After_Price * AddCartResult?.AddQuntity}
																					</h6>

																				</div>
																			</div>

																		</div>

																	</>
																)
															})
														) : (

															<span className='EmptyCartSection col-md-8 col-lg-7'>
																<img src={cart} /></span>

														)
													}

													<div class="cart-valus">
														<form>

															<h5>Subtotal <span class="total-cart">Rs.{
																AddCart?.reduce((acc, item) => acc + (item?.After_Price * item?.AddQuntity), 0)
															}</span></h5>
															<p>Shipping, taxes, and discount codes calculated at checkout.</p>

															<div class="cart-coupon">


																<input type="text" placeholder="Coupon Code" class="form-control" />

																<input type="button" value="APPLY" class="form-control submit-btn" />


																<a href="#" class="show-btn order-carts">Order</a>
															</div>
														</form>

													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={`tab-pane fade show ${activeTab === 'contact' ? 'active' : ''}`} id="contact" role="tabpanel" aria-labelledby="contact-tab">
										<div class="cart-order">
											<div class="cart-order">
												<div class="row">
													<div class="col-md-8 col-lg-7">
														{
															CondactInfromation?.map((CondactInfromationResult) => {
																return (
																	<>
																		<form>
																			<h5 class="category-heading-title pb-0">Condtact Information</h5>
																			<div class="order-product payment-info">
																				<h6><strong>Name:</strong>{CondactInfromationResult?.First_Name} {CondactInfromationResult?.First_Name}</h6>
																				<h6><strong>Email:</strong> {CondactInfromationResult?.email}</h6>
																				<h6><strong>Mobile:</strong> +91 {CondactInfromationResult?.mobile}</h6>
																			</div>
																			<h5 class="category-heading-title pb-0">Shipping Address</h5>

																			<div class="order-product">
																				<div class="row">
																					<div class="col-8 col-md-7">
																						<div class="shipping-info">
																							<p><strong>Shipping Address:</strong>{CondactInfromationResult?.Address}</p>
																						</div>
																					</div>
																					<div class="col-4 col-md-5 text-end">
																						<div class="shipping-info">
																							<p>Change</p>
																						</div>
																					</div>
																				</div>
																			</div>

																		</form>
																		<h5 class="category-heading-title pb-0">
																			Shipping Method</h5>

																		<button onClick={handleShow}
																			class="show-btn order-carts">Online</button>
																		<Modal show={show} onHide={handleClose}>
																			<Modal.Header closeButton>
																				<Modal.Title>Payment Summary </Modal.Title>
																			</Modal.Header>
																			<Modal.Body>
																				<section className='Payment_Gateway_Modal_Body'>
																					<div className='Payment_Gateway_Summary_Modal_Body'>
																						<h2 className=' btn btn-warning Payment_Gateway_Summary_Modal_Body_summary'>Summary</h2>
																						<div className='Payment_GateWay_Summmary_AddCartResult'>
																							{
																								AddCart?.map((AddCartResult) => {
																									return (
																										<>
																											<div class="Payment_GateWay_Summmary_AddCartResult_Add">
																												<div class="order-product1">
																													<div class="Payment_GateWay_Summmary_cart-order-info">
																														<div class="Payment_GateWay_Summmary_cart-order">
																															<img style={{ width: "50%", height: "80px" }} src={`${IMG_BASE_URL}${AddCartResult?.images}`}
																																class="img-fluid" alt="" />
																														</div>
																														<div className='Payment_GateWay_Summmary_Title_sections'>

																															<div>
																																<div>{AddCartResult?.title}</div><strong>Create By</strong>
																																<span>{AddCartResult?.by_Created}</span>
																															</div>

																															<h6><strong>Quntity:</strong> [{EditAddQuntity[AddCartResult._id1]}]</h6>
																															<h6>
																																<strong>Price:</strong>
																																Rs.{AddCartResult?.After_Price * AddCartResult?.AddQuntity}
																															</h6>
																														</div>


																													</div>
																												</div>

																											</div>

																										</>
																									)
																								})
																							}

																						</div>
																						<span><strong>Total Price:</strong></span>
																						<span class="total-cart">

																							(Rs.{AddCart?.reduce((acc, item) =>
																								acc + (item?.After_Price * item?.AddQuntity), 0)})

																						</span>
																					</div>
																					<div className='Payment_Gateway_Payment_Modal_Body'>
																						<h3>Payment</h3>
																						<form onSubmit={GetPaymentFormHandlingDetails} className='Payment_Gateway_Payment_Modal_Body_form'>
																							<div
																								className='Payment_Gateway_Payment_Modal_Body_form_div'>
																								<div><label>
																									<strong>CARD NUMBER</strong>
																								</label></div>
																								<input
																									type='number'
																									name='CardNumber'
																									value={CardNumber}
																									onChange={(e)=>setCardNumber(e.target.value)}
																									placeholder='4444-4444-4444-4444'
																								
																								/>



																							</div>
																							<div
																								className='Payment_Gateway_Payment_Modal_Body_form_div'
																							>
																								<div>
																									<label>
																										<strong>CARD HOLDER NAME</strong>
																									</label>
																								</div>
																								<input name='CardHolderName'
																									value={CardHolderName}
																									onChange={(e) =>
																										setCardHolderName(e.target.value)}
																									placeholder='Enter the User Name'
																								/>
																							</div>
																							<div className='Payment_Gateway_Payment_Modal_Body_form_div'>
																								<div><label><strong>EXPIRAY DATE</strong></label>
																								</div>
																								<div className='d-flex'>
																									<span>
																										<input
																											style={{ width: "70%" }}
																											value={ExpirayDateYear}
																											name='ExpirayDateYear'
																											onChange={(e) =>
																												setExpirayDateYear(e.target.value)}
																											type='Number'
																											placeholder='Month'
																											maxlength='2' />
																									</span>
																									<span>
																										<input
																											value={ExpirayDateMonth}
																											name='ExpirayDateMonth'
																											onChange={(e) =>
																												setExpirayDateMonth(e.target.value)}
																											style={{ width: "70%" }} type='Number'
																											placeholder='Year' />
																									</span>
																								</div>
																								<div
																									className='Payment_Gateway_Payment_Modal_Body_form_div'
																								>
																									<div>
																										<label>
																											<strong>CVC</strong>
																										</label>
																									</div>
																									<span><input
																										name='CVC' value={CVC} onChange={(e) => setCVC(e.target.value)} style={{ width: "20%" }} type='number'
																										placeholder='1234' /></span>
																								</div>
																							</div>
																							<div>
																								<button className='btn btn-warning'
																									type='submit'
																								>
																									<strong>Purchase</strong>
																								</button>
																							</div>
																						</form>
																					</div>
																				</section>
																			</Modal.Body>

																		</Modal>
																	</>
																)
															})
														}

													</div>
													<div class="col-md-4 col-lg-5">
														{
															AddCart?.slice(0, 2)?.map((AddCartResult) => {
																return (
																	<>
																		<div class="order-product">
																			<div class="cart-order-info">
																				<div class="cart-order">
																					<img src={`${IMG_BASE_URL}${AddCartResult?.images}`}
																						class="img-fluid" alt="" />
																				</div>
																				<div class="cart-order">
																					<div class="delate-product"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																						<path d="M0 2H3L5 0H9L11 2H14V4H0V2Z" fill="#47525D" />
																						<path d="M9.9165 4.78569V13.3571" stroke="#47525D" />
																						<path d="M4.55957 4.78569V13.3571" stroke="#47525D" />
																						<path d="M7.23779 4.78569V13.3571" stroke="#47525D" />
																						<path d="M13 5V14C13 14.5523 12.5523 15 12 15H2C1.44771 15 1 14.5523 1 14V5" stroke="#47525D" stroke-width="2" />
																					</svg>
																					</div>
																					<h4 class="detail-heading">{AddCartResult?.title}</h4>
																					<h6 class="detail-sub-heading">By {AddCartResult?.by_Created}</h6>

																					<h6><strong>Size:</strong> {AddCartResult?.selectedSize}</h6>
																					<h6><strong>Quantity</strong>
																						<div class="input-group number-spinner">
																							<div class="input-group-prepend">
																								<button onClick={() => {
																									EditProductAddToCart(AddCartResult?._id1,
																										EditAddQuntity[AddCartResult?._id1], "inc");
																								}} className='btn btn-warning'>+</button>
																							</div>
																							<input type="text" name='AddQuntity'
																								value={EditAddQuntity[AddCartResult._id1]}
																								onChange={(e) =>
																									setEditAddQuntity(prevState => ({
																										...prevState,
																										[AddCartResult._id]: e.target.value
																									}))}
																								class="form-control countnumber text-center" />

																							<div class="input-group-append">
																								<button onClick={() => {
																									EditProductAddToCart(AddCartResult._id1,
																										EditAddQuntity[AddCartResult._id1], "dec", EditAddQuntity[AddCartResult._id1]);
																								}} className='btn btn-warning'>-</button>

																							</div>
																						</div>
																					</h6>
																					<h6>
																						<strong>Price:</strong>
																						Rs.{AddCartResult?.After_Price * AddCartResult?.AddQuntity}
																					</h6>

																				</div>
																			</div>
																		</div>
																	</>
																)
															})
														}

														<div class="cart-valus">
															<form>

																<h5>Subtotal <span class="total-cart">Rs.{
																	AddCart?.reduce((acc, item) => acc + (item?.After_Price * item?.AddQuntity), 0)
																}</span></h5>
																<p>Shipping, taxes, and discount codes calculated at checkout.</p>

																<div class="cart-coupon">


																	<input type="text" placeholder="Coupon Code" class="form-control" />

																	<input type="button" value="APPLY" class="form-control submit-btn" />


																	<a href="#" class="show-btn order-carts">Order</a>
																</div>
															</form>

														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			{/* <----------Footer section----------> */}
			<Footer />
		</div>
	)
}

export default Cart