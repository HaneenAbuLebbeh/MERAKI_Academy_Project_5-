const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
const app = express();


//routers 
const userRouter=require("./routes/users")


//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware 
app.use("/users",userRouter)


 





const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
 