const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
const app = express();


//routers 
const userRouter=require("./routes/users")
const productRouter = require("./routes/product");


//built-in middleware
app.use(express.json());
app.use(cors());


// router middleware 
app.use("/users",userRouter)
app.use('/products', productRouter)








const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
