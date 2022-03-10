const express = require('express');
const mongoose = require('mongoose');

// wyciągam router
const router = express.Router();

// importuję model
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
      .then((result) => {
        res.status(200).json({
          wiadomosc: 'Lista wszystkich produktów',
          info: result,
        });
      })
      .catch((err) => res.status(500).json({ wiadomosc: err }));
  });

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    })
    product
        .save()
        .then(result => {
            res.status(201).json({
                wiadomosc: "Dodanie nowego produktu",
                info: result,
            })
        })
        .catch(err => res.status(500).json({wiadomosc: err}));
}) ;

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .then(result =>{
            res.status(200).json({
                wiadomosc: "Szczgóły produktu o nr " + id,
                info: result,
            })

        })
        .catch(err => res.status(500).json({wiadomosc: err}));
});
router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(
        id, 
        {name: req.body.name, price: req.body.price},
        {new: true})
            .then(result =>{
                res.status(200).json({
                    wiadomosc: "Zmiana produktu o nr " + id,
                    info: result,
                })     
            })
            .catch(err => res.status(500).json({wiadomosc: err}));

});
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(result =>{
            res.status(200).json({
                wiadomosc: "Usunięcie produktu o nr " + id,
            info: result,
            })

        })
        .catch(err => res.status(500).json({wiadomosc: err}));
});

module.exports = router;
