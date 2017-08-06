const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //     // include: [
      //     //       path.resolve(__dirname, "src")
      //     //     ],         
      //     exclude: [
      //           path.resolve(__dirname, "node_modules")
      //         ],
      //   // use: {
      //     loader: 'babel-loader'
      //   //   options: {
      //   //     presets: ['env']
      //   //   }
      //   // }
      // },
      {
        test: /\.js$/,
        loader: 'shebang-loader'
      }
    ]
    },
    node: {
       fs: "empty"
    }
};