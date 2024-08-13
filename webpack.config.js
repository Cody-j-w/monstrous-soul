const { library } = require("webpack");

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    output: {
      path: `${__dirname}/public/dist`,
      filename: 'bundle.js',
      library: {
        name: 'library',
        type: 'window'
      }
    },
}