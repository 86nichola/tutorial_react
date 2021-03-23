const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v7",
    createProxyMiddleware({
      target: "https://query1.finance.yahoo.com",
      changeOrigin: true,
    })
  );
};
