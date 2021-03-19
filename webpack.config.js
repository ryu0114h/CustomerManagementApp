const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: ["web", "es5"],
};
