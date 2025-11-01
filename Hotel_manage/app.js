const express = require('express');
const fs = require('fs');
const { dirname } = require('path');
const morgan = require('morgan');
const app = express();
// It will parse th data
app.use(morgan('dev'));
app.use(express.json()) // it is middleware where act as mediator between request and response
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
app.use((req, res, next) => {
  console.log("Hello from the Middleware");
  next()
})
app.use((req, res, next) => {
    
  req.requestTime =  new Date().toISOString();
  next();
})
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)
// manually in the node js we have to setup the content : application json but here by writting the .json it will automaitcally setup the content type.json 
module.exports = app;