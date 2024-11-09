const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");

const { 
    createProduct,
    } = require("../controllers/product");

const productRouter = express.Router();



productRouter.post("/",authentication, authorization("Admin"),createProduct);



module.exports = productRouter;
