import React from 'react'
import "../../../assets/css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/bootstrap.min.css";
import NewHeader from '../../NewHeader/NewHeader';
import Footer from '../../Footer';
const ReturnPolicy = () => {
    return (
        <div>
            {/* This is Header section here */}
            <NewHeader />
            <div class="all-blog-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="blog-conent p-0">
                                <ul>

                                    <li>Exchange & return request can be made within 15 days of purchasing at product from bebe & bunny. On assessing the condition of the returned product, a suitable action will be taken against an order.</li>
                                    <li>No refund will be given against any order. A credit note will be issued which can be redeemed against any order</li>


                                    <li><strong>If i am not satisfied with quality of the product, can i return it?</strong></li>
                                    <li>Ofcourse! bebe&bunny.in has “Customer first Policy”. Report your concern by getting in touch at help@bebe&bunny.in Once the product passes the quality check, we would initiate the replacement as per your choice.</li>


                                    <li><strong>How do i place a return request on BEBE & Bunny?</strong></li>
                                    <li>To return an order, click here.The parcel should be in its original packaging and box as received along with all the trims & accessories (back support, clips, tags, laces, etc.) with the original invoice. Worn or damaged products will not be accepted.Once the return request is created, we will ensure that the return is processed as soon as possible.</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <------- Footer section ----------> */}
            <Footer />
        </div>
    )
}

export default ReturnPolicy