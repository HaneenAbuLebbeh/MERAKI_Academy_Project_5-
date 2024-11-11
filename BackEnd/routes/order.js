const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");



const { 
    createOrder,
} = require("../controllers/order");

const ordertRouter = express.Router();


ordertRouter.post('/',authentication,  createOrder);




module.exports = ordertRouter;

