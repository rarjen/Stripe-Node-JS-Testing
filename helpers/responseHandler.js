module.exports = {
  succes: (res, message, data) => {
    res
      .status(200)
      .json({
        code: 200,
        message,
        data,
      })
      .end();
  },
  created: (res, message, data) => {
    res
      .status(201)
      .json({
        code: 201,
        message,
        data,
      })
      .end();
  },
  error: (res, message, data) => {
    res
      .status(400)
      .json({
        code: 400,
        message,
        data,
      })
      .end();
  },
};
