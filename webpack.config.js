const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
      },
  // Can be 'development' or 'production'
  mode: 'development', 
  // The starting point of your application
  entry: './src/index.js', 
  output: {
    // The name of the bundled file
    filename: 'bundle.js',
    // The absolute path to the output directory
    path: path.resolve(__dirname, 'dist'), 
    // Cleans the /dist folder before each build
    clean: true, 
  },

  plugin: [
    new HtmlWebpackPlugin({
        title: 'My todo-app',
        template: 'src/index.html'
    })
  ],
};
