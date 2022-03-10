//import expressa
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// tworzę instancję expressa
const app = express();

// zmienne środowiskowe
require('dotenv').config();

// łącze się z bazą danych
mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.tdsii.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`);

// parsuje część body (body of http)
app.use(bodyParser.json());

// logger
app.use(morgan("combined"))

// block importowanie routów
const productRoutes = require("./api/routes/products");

// użycie routów
app.use("/products", productRoutes);

//domyślny router
app.use((req, res, next) => {
    res.status(200).json({wiadomosc: "Wszystko śmiga"})
});

//eksport
module.exports = app;
