const express = require("express");
require("./src/Connection/Connection");
const user_router =require("./src/Router/user_router")
let cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())


app.use("/api/v1/",user_router);


app.listen(9090,()=>{
    console.log("Port is listing at 9090")
})