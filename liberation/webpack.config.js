'use strict';
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry : {
    main : './src/main.js'
  },

  output : {
    path : path.join(__dirname, 'dist'),
    filename : '[name].js'
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
        test : /\.vue$/,
        loader : 'vue'
      }
    ]
  },

  resolve : {
    root : [path.join(__dirname, 'src')],
    extensions : ['', '.js', '.css', '.styl', '.vue'],
    alias : {
      jquery : path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'),
      lodash : path.join(__dirname, 'node_modules', 'lodash', 'lodash.min.js'),
      backbone : path.join(__dirname, 'node_modules', 'backbone', 'backbone-min.js'),
      Vue : path.join(__dirname, 'node_modules', 'vue', 'dist', 'vue.min.js')
    }
  },

  plugins : [
    new webpack.ProvidePlugin({
      $: "jquery",
      Backbone : 'backbone',
      _ : 'lodash',
      Vue : 'Vue'
    })
  ]

}
