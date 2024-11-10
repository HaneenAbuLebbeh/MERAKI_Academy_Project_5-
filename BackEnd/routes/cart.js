

const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");

const {
    addToCart,
    } = require("../controllers/cart");

const cartRouter = express.Router();



cartRouter.post('/add',authentication, authorization("User","Admin") ,addToCart);




module.exports = cartRouter;


