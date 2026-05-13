const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 
module.exports = {
  // 1. MODE: tells webpack we are in development
  mode: "development",
 
  // 2. ENTRY: where webpack starts reading your code
  entry: "./src/index.js",
 
  // 3. OUTPUT: where webpack puts the finished bundle
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // clears the dist folder each time you build
  },
 
  // 4. PLUGINS: connects your index.html to the bundle automatically
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
 
  // 5. MODULE RULES: teaches webpack how to handle CSS files
  module: {
    rules: [
      {
        test: /\.css$/i,           // any file ending in .css
        use: ["style-loader", "css-loader"], // process it with these two loaders
      },
    ],
  },
}