const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'@babel/polyfill',
		'./src/index.js'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: './dist',
		overlay: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};