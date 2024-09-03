const { stripePayment, stripeSubscription } = require("../../utils/stripe");

const payment = async (req) => {
  const payload = {
    name: "NodeJS and Express Book",
    amount: 50,
    quantity: 1,
  };

  const session = await stripePayment(payload);

  return session;
};

const subsctiption = async (req) => {
  const session = await stripeSubscription(req);

  return session;
};

module.exports = { payment, subsctiption };
