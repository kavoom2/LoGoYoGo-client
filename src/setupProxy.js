require("dotenv").config();
const API_ICON = process.env.REACT_APP_SERVER_API_ICONFINDER;
const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.iconfinder.com",
      https: true,
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      headers: { Accept: "application/json" },
    })
  );
};
