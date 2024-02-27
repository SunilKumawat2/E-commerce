const mongoose = require("mongoose");

const mongodb = mongoose.connect("mongodb+srv://sunilmi7891:MsORZ3IRNX8RYAII@cluster0.73wobrn.mongodb.net/e-commerce")

    .then(() => {
        console.log("Sucessfully Connect with the E-commerce Database")
    }).catch(() => {
        console.log("Not Connect with the E-commerce Database")

    })
module.exports = mongodb