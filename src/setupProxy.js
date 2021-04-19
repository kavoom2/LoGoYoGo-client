const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.iconfinder.com",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      onProxyRes(proxyRes, req, res) {
        delete proxyRes.headers["content-length"];

        modifyResponse(
          res,
          proxyRes.headers["content-encoding"],
          function (body) {
            if (body) {
              // modify some information
              body.version = 2;
              body.props = {
                nestedProps: true,
              };
            }
            return body;
          }
        );
      },
    })
  );
};
