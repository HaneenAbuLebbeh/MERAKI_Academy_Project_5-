const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");



const { 
    createOrder,
    getUserOrders,
    
} = require("../controllers/order");

const ordertRouter = express.Router();


ordertRouter.post('/',authentication,  createOrder);

ordertRouter.get('/',authentication, authorization("User","Admin"), getUserOrders);




module.exports = ordertRouter;

