

const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");

const {
    addToCart,
    getUserCart,
    updateCartQuantity,
    removeFromCart,
    } = require("../controllers/cart");

const cartRouter = express.Router();



cartRouter.post('/add',authentication, authorization("User","Admin"), addToCart);

cartRouter.get('/',authentication,authorization("User","Admin"), getUserCart);

cartRouter.put('/updateQuantity', authentication, authorization("User","Admin"), updateCartQuantity);

cartRouter.delete('/',authentication, authorization("User","Admin"), removeFromCart);


module.exports = cartRouter;


