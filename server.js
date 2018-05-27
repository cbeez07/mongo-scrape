const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

const db = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render('index')
})

require('./routes/route')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);   
});