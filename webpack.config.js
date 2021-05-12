module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(mov|mp4)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader?attrs[]=video:src",
      },
      {
        test: /\.mp4$/,
        loader: "url?limit=10000&mimetype=video/mp4",
      },
    ],
  },
};
