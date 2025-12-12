const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/mechriapi",
    createProxyMiddleware({
      target: "https://mechrisoft.com",
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
    })
  );
};
