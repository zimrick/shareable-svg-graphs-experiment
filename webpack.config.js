module.exports = {
  entry: './client/index',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'client.js'
  }
  // devtool: 'source-map',
  // module: {
  //   loaders: [
  //     { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
  //   ]
  // }
};
