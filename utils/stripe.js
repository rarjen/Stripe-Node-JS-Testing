const ApiError = require("../helpers/errorHandler");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { BASE_URL } = process.env;

const stripePayment = async (payload) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: payload.amount * 100,
          product_data: {
            name: payload.name,
          },
        },
        quantity: payload.quantity,
      },
      {
        price_data: {
          currency: "usd",
          unit_amount: 90 * 100,
          product_data: {
            name: "Test Data",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${BASE_URL}/success`,
    cancel_url: `${BASE_URL}/cancel`,
  });

  // console.log(session);

  return session;
};

const stripeSubscription = async (req) => {
  const { plan } = req.query;

  if (!plan) return ApiError.badRequest("Plan is required");

  let priceId = "";

  switch (plan.toLowerCase()) {
    case "starter":
      priceId = "price_1Pu8ss04oV7yRFSUeYukDo4m";
      break;
    case "pro":
      priceId = "price_1Pu8sa04oV7yRFSUlegUAesy";
      break;
    default:
      ApiError.badRequest("Invalid plan");
      break;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${BASE_URL}/success_subscription?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${BASE_URL}/cancel_subscription`,
  });

  // console.log(session);

  return session;
};

module.exports = { stripePayment, stripeSubscription };
