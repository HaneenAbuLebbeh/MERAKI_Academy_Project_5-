const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require("./models/db");
const app = express();
const cloudinary = require('cloudinary').v2;

//routers 
const userRouter=require("./routes/users")
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const ordertRouter = require("./routes/order");
const categoryRouter=require("./routes/category")
const touristRouter=require("./routes/TouristSpots")
const reviewRouter=require("./routes/review")

//built-in middleware
app.use(express.json());
app.use(cors());


// router middleware 
app.use("/users",userRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
app.use('/orders', ordertRouter)
app.use('/category', categoryRouter)
app.use('/touristspot', touristRouter)
app.use('/review', reviewRouter)


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configured successfully!");

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    
    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({ message: 'Image uploaded successfully', image_url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});



const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

