const webpack = require("webpack");

module.exports = {
	context: __dirname + '/src/' ,
	entry: {
		app: './index.js'
	},
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, use: [{ loader: "babel-loader", query: { presets: ['es2015'] }}] },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			{ test: /\.(sass|scss)$/, use: ["style-loader", "css-loader", "sass-loader"] }
		]
	},
	devServer: {
		contentBase: __dirname ,
	},
	
}