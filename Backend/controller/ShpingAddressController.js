const ShipingAddres = require("../models/ShipingAddress");
const authenticateToken = require('../middleware/MiddleWare');
const CreateShipingAddres = async (req, res) => {
    try {
        // Verify the token using the authenticateToken middleware
        authenticateToken(req, res, async () => {
            // If authentication is successful, proceed to add the product to the cart
            const userData = req.userData;

            // Destructure the requestData object
            if (userData) {
                const requestData = req.body.requestData; // Access the requestData object
                const { mobile,
                    pincode,
                    state,
                    city,
                    Appartment,
                    AddtionalAddress,
                    Address,
                    company,
                    Last_Name,
                    First_Name } = requestData;
                // Include additional user information in the token payload
                const tokenPayload = {
                    userId: userData._id,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                };
                // Check if the email already exists in the database
                const exitsEamil = await ShipingAddres.findOne({ "tokenPayload.email": tokenPayload.email })
                if (exitsEamil) {
                    return res.status(409).json({ status: 409, message: 'Already Shping Address Created' })
                }
                const NewProductAddToCart = new ShipingAddres({
                    tokenPayload,
                    mobile,
                    pincode,
                    state,
                    city,
                    Appartment,
                    AddtionalAddress,
                    Address,
                    company,
                    Last_Name,
                    First_Name
                });

                // Save the product to the cart
                await NewProductAddToCart.save();
                // Send a success response
                return res.status(201).json({
                    status: 201,
                    message: 'Successfully Added To The Cart',
                    data: {
                        NewProductAddToCart,
                        tokenPayload,

                    },
                });
            } else {
                // If authentication fails, return an unauthorized response
                return res.status(401).json({
                    status: 401,
                    message: 'Unauthorized. Token verification failed.',
                });
            }
        });
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return res.status(500).json({
            status: 500,
            message: 'Server Side Error Adding To The Cart',
        });
    }
};

const GetShipingAddress = async (req, res) => {
    try {
        const userEmail = req.userData.email;
        console.log("userEmail", userEmail)
        const ShpingAddressList = await ShipingAddres.find({ 'tokenPayload.email': userEmail })
        console.log("ShpingAddressList", ShpingAddressList)
        if (ShpingAddressList.length > 0) {
            const ShpingAddressListData = ShpingAddressList?.map((ShpingAddressListResult) => ({
                _id: ShpingAddressListResult._id,
                First_Name: ShpingAddressListResult.First_Name,
                Last_Name: ShpingAddressListResult.Last_Name,
                company: ShpingAddressListResult.company,
                AddtionalAddress: ShpingAddressListResult.AddtionalAddress,
                Address: ShpingAddressListResult.Address,
                Appartment: ShpingAddressListResult.Appartment,
                city: ShpingAddressListResult.city,
                state: ShpingAddressListResult.state,
                pincode: ShpingAddressListResult.pincode,
                mobile: ShpingAddressListResult.mobile,
                email: ShpingAddressListResult.tokenPayload.email,
            }))
            console.log("ShpingAddressListData", ShpingAddressListData)
            return res.status(200).json({
                status: 200,
                message: "Successfully Fetch the ShpingAddressListData",
                data: ShpingAddressListData
            })
        }
        return res.status(400).json({
            status: 400,
            message: "data not  Found the ShpingAddressListData"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Server Side error Fetching the ShpingAddressListData"
        })
    }
}

module.exports = { CreateShipingAddres, GetShipingAddress }