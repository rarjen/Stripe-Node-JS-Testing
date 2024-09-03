const responseHandler = require("../../helpers/responseHandler");
const {
  payment,
  subsctiption,
} = require("../../services/payment/payment.service");

const makePayment = async (req, res, next) => {
  try {
    const result = await payment();

    // console.log("result");
    // console.log(result.url);

    console.log("result");
    console.log(result.url);

    // return res.redirect("https://www.google.com/");

    return responseHandler.succes(res, "success", result.url);
  } catch (error) {
    next(error);
  }
};

const makeSubscription = async (req, res, next) => {
  try {
    const result = await subsctiption(req);

    const urlSessionSubs = new URL(result.url);

    return res.redirect(urlSessionSubs);
  } catch (error) {
    next(error);
  }
};

module.exports = { makePayment, makeSubscription };
