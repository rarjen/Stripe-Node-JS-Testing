const router = require("express").Router();
const responseHandler = require("../helpers/responseHandler");
const payment = require("./payment.routes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/test", (req, res) => {
  return responseHandler.succes(res, "Test Route");
});

router.get("/checkout", (req, res) => {
  res.render("index.ejs");
});

router.get("/subscription", (req, res) => {
  res.render("subscription.ejs");
});

router.get("/success", (req, res) => {
  res.send("Success");
});

router.get("/cancel", (req, res) => {
  res.send("Cancelled");
});

router.get("/success_subscription", async (req, res) => {
  const { session_id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["subscription", "subscription.plan.product"],
  });

  console.log(JSON.stringify(session));

  // console.log("customer details");
  // console.log(session.customer);
  // console.log(session.customer_details.email);
  // console.log(session.customer_details.name);

  res.send("Success subscribed");
});

router.get("/cancel_subscription", async (req, res) => {
  res.redirect("/api/v1/subscription");
});

router.get("/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.BASE_URL}/`,
  });

  // console.log(portalSession);

  res.redirect(portalSession.url);
});

router.use("/checkout", payment);

module.exports = router;
