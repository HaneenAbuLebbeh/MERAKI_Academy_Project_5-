const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");


const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
 