require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

require('./api/routes/api.routes.js')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Running on ' + PORT);
});
