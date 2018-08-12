import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin'

export default  {
  entry: './src/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [... ]
  },
  plugins: [..]
};
