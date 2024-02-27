const dbconnection = require("./config/DbConenection");
const cors = require("cors");
const express = require("express");
const ApiRouter = require("./routes/ApiRouter");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"))
const port = 4002;

//  Routes
app.use("/ecommerce/api",ApiRouter);

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})