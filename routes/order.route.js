const express = require("express");
const router = express.Router();
const order=require("../controllers/order.controller")
const verifytoken =require("../Middleware/verifytoken");
const Validator = require("../Middleware/validator")

const validaterequest = Validator(true);

router.post("/createorder",validaterequest,verifytoken.verifytoken,order.checkout)
router.get("/",verifytoken.verifytoken,order.getAllOrder)
router.delete("/delete/:idOrder",verifytoken.verifytoken,order.deleteOrderByIdCarts)
router.post("/update/paid/:idOrder",order.updateOrderToPaid)
router.post("/update/rejected/:idOrder",order.updateOrderToRejected)

module.exports = router;