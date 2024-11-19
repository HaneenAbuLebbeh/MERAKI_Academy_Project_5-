const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");



const { 
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders

} = require("../controllers/order");

const ordertRouter = express.Router();


ordertRouter.post('/',authentication,authorization("User","Admin"),  createOrder);

ordertRouter.get('/',authentication, authorization("User","Admin"), getUserOrders);

ordertRouter.get('/admin',authentication, authorization("Admin"), getAllOrders);

ordertRouter.get('/:id',authentication, authorization("User","Admin"), getOrderById);



module.exports = ordertRouter;

