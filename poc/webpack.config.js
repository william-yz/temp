const path = require('path');

module.exports = {
  entry : {
    main : './public/src/main.js'
  },

  output : {
    path : path.join(__dirname, 'public'),
    filename : '[name].js' 
  },

  module : {
    loaders : [
      {
        test : /\.css$/,
        loader : 'style!css'
      },{
        test : /\.js$/,
        exclude : /node_modules/,
        loaders : ['babel']
      },{
        test : /\.tpl$/,
        loaders : 'text'
      }
    ]
  },

  resolve : {
    root : [path.join(__dirname, 'public/src')],
    extensions : ['', '.js', '.css'],
    alias : {
      jquery : path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'),
      lodash : path.join(__dirname, 'node_modules', 'lodash', 'lodash.min.js'),
      Class : path.join(__dirname, 'public', 'src', 'util', 'Class.js')
    }
  }

}