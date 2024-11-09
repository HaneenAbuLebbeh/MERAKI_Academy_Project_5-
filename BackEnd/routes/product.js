const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");

const { 
    createProduct,
    getProductsByTouristSpotsId,

    } = require("../controllers/product");

const productRouter = express.Router();



productRouter.post("/",authentication, authorization("Admin"),createProduct);

productRouter.get("/:touristSpotsid", getProductsByTouristSpotsId);


module.exports = productRouter;
