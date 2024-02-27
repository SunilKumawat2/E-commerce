import React from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import Footer from '../../Footer';
const Contact = () => {
  return (
    <div>
      {/* This is Header Section here */}
      <NewHeader/>
<div class="category-section">
  <div class="category-tabs pt-0">
    <div class="container">
	<div class="order-product">
      <div class="row">
        <div class="col-md-6 order-2 order-md-1 order-lg-1 order-xl-1">
          
		  <form>
                  <div class="shipping-form">
                    <input type="text" placeholder="Name" class="form-control"/>
                  </div>
				  <div class="shipping-form">
                    <input type="email" placeholder="Email Address" class="form-control"/>
                  </div>
				   <div class="shipping-form">
                    <input type="phone" placeholder="Mobile Number" class="form-control"/>
                  </div>
				   <div class="shipping-form">
                    <input type="text" placeholder="Subject" class="form-control"/>
                  </div>
				   <div class="shipping-form">
                   <textarea placeholder="Message" class="form-control" rows="4"></textarea>
                  </div>
				  <div class="shipping-form">
                   <input type="submit" value="Submit" class="show-btn order-carts"/>
                  </div>
  		  </form>
           
        </div>
        <div class="col-md-6 order-1 order-md-2 order-lg-2 order-xl-2 d-flex">
          <div class="contact-bg-space">
		   <h5 class="category-heading-title profile-address p-0">Contact Info</h5>
		  <div class="contact-info">
		  <div class="contact-icon">
		  	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.04172 1.62836C1.01406 2.0153 1 2.40601 1 2.8C1 5.11859 1.48709 7.32342 2.36453 9.31774C3.99551 13.0248 6.97521 16.0045 10.6823 17.6355C12.6766 18.5129 14.8814 19 17.2 19C17.594 19 17.9847 18.9859 18.3716 18.9583C18.7359 18.8431 19 18.5024 19 18.1L19 14.2487C19 13.8613 18.7521 13.5174 18.3846 13.3949L14.3405 12.0468C13.9156 11.9052 13.4512 12.0976 13.2509 12.4982L11.4886 16.0229C8.12789 14.5693 5.43066 11.8721 3.9771 8.51145L7.50184 6.74908C7.90244 6.54878 8.0948 6.08439 7.95316 5.65949L6.60513 1.61539C6.48263 1.24789 6.1387 1 5.75132 1L1.9 1C1.49762 1 1.15691 1.26407 1.04172 1.62836V1.62836Z" stroke="#47525D" stroke-width="2"/>
</svg>

		  </div>
		  <div class="contact-details">
		  <h5 class="category-heading-title profile-address  pb-0">Talk to Us</h5>
		  <p>Toll Free: 1800 122 9090</p>
		  
		  </div>
  		  </div>
		  <div class="contact-info">
		  <div class="contact-icon">
		  	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="16" rx="2" transform="matrix(-1 8.74228e-08 8.74228e-08 1 22 4)" stroke="#47525D" stroke-width="2"/>
<path d="M1.99847 4.99846L10.6353 11.7175C11.438 12.3419 12.562 12.3419 13.3647 11.7175L22.0015 4.99846" stroke="#47525D" stroke-width="2"/>
</svg>


		  </div>
		  <div class="contact-details">
		  <h5 class="category-heading-title profile-address  pb-0">Contact Us</h5>
		  <p>help@sunil123@gmail.com </p>
		  
		  </div>
  		  </div>
            </div>
        </div>
		</div>
      </div>
    </div>
  </div>
</div>
{/* <------Footer section----------> */}
<Footer/>
    </div>
  )
}

export default Contact