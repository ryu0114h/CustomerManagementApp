const path = require("path");

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: ["web", "es5"],
};
