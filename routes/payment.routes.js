const router = require("express").Router();
const payment = require("../controllers/payment/payment.controller");

router.post("/", payment.makePayment);

router.get("/subscribe", payment.makeSubscription);

module.exports = router;
