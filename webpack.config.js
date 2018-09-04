var path = require('path');
module.exports = {
    entry: "./app/assets/scripts/App.js",
   output : {
       path: path.resolve(__dirname, "./app/temp/scripts"),
       filename: "App.js"
   },
   module: {
    //    use rules instead of loaders
       rules: [
        {   
           loader: 'babel-loader',
           query: {
               presets: ['es2015']
           },
           test: /\.js$/,
           exclude: /node_modules/
        }
       ]
   }
}