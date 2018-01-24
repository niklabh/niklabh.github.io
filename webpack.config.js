const debug = process.env.NODE_ENV !== 'production'
const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : false,
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '/javascripts'),
    filename: 'scripts.min.js'
  },
  plugins: debug ? [
    new webpack.DefinePlugin({
      SIGN_IN_REDIRECT: JSON.stringify('http://localhost:5000')
    })
  ] : [
    new webpack.DefinePlugin({
      SIGN_IN_REDIRECT: JSON.stringify('https://niklabh.github.io')
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
}
