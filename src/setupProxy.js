const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.iconfinder.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      headers: { Accept: "application/json" },
    })
  );
};
