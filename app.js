const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const users = require('./routes/users');

mongoose.connect(dbConfig.database, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});
mongoose.connection.on('error', () => {
  console.log('Error while connecting to DB');
});

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use('/users', users);
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
