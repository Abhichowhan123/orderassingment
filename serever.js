const express = require('express')
var bodyParser = require('body-parser');

const app= express()
const oderRoutes = require('./routes/oderRoutes');

const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/order',oderRoutes);

app.listen(port,()=>console.log(`app is runing ${port}`))