'use strict';
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry : {
    main : './src/main.js'
  },

  output : {
    path : path.join(__dirname, 'src'),
    filename : 'bondle.js'
  },

  module : {
    loaders : [
      {
        test : /\.css$/,
        loader : 'style!css'
      }/*,{
        test : /\.js$/,
        exclude : /node_modules/,
        loaders : ['babel']
      }*/,{
        test : /\.styl$/,
        loader : 'style!css!stylus'
      },{
        test : /\.html$/,
        loader : 'vue-html'
      },{
        test : /\.tag$/,
        loader : 'text'
      }
    ]
  },

  resolve : {
    root : [path.join(__dirname, 'src')],
    extensions : ['', '.js', '.tag'],
    alias : {
      jquery : path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'),
      lodash : path.join(__dirname, 'node_modules', 'lodash', 'lodash.min.js'),
      riot : path.join(__dirname, 'node_modules', 'riot', 'riot+compiler.js')
    }
  },

  plugins : [
    new webpack.ProvidePlugin({
      $: "jquery",
      // Backbone : 'backbone',
      _ : 'lodash',
      riot : 'riot'
    })
  ]

}
