const express=require('express');

const app =express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '');
  next();
});


const useRoutes = require('../router')
app.useRoutes = useRoutes

app.useRoutes()


const cors=require('cors')
app.use(cors())

module.exports=app