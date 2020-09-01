const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const PORT = 4000;
const userRoutes = express.Router();

//route imports
const codeSnippetRoutes = require("./routes/codesnippets.route");
const tagRoutes = require("./routes/tags.route");

var corsOptions = {
    origin: 'http://127.0.0.1:3000',
    credentials: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/codesnippets', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use('/codesnippets', codeSnippetRoutes);
app.use('/tags', tagRoutes);
  
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});