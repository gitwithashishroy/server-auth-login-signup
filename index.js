const dotenv = require('dotenv') ; 
const express = require('express');
const app = express();

dotenv.config({path: './config.env'}) ;
const port = process.env.PORT ; 


const db = require('./config/mongoose') ; 

app.use(express.json()) ; 

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next(); 
});

// use express router  like a middle ware
app.use('/' , require('./routes'));



// set up server
app.listen(port , function(err){
  if(err){
      console.log(`Error in running the server : ${port}`) ; 
  }
  
  console.log(`Server is running on port : ${port}`) ; 
}) ; 
