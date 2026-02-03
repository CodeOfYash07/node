require('./Config/db.Config');
const Fruit = require('./models/Fruit.Models');
const express = require('express');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View Fruits
app.get('/', async (req, res) => {
    const allFruits = await Fruit.find();
    res.render('ViewFruit', { allFruits });
});

// Add Fruit Page
app.get('/AddFruit', (req, res) => {
    res.render('AddFruit');
});

// Insert Fruit
app.post('/addFruit', async (req, res) => {
    await Fruit.create(req.body);
    res.redirect('/');
});

// Edit Fruit Page
app.get('/EditFruit/:id', async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);
    res.render('EditFruit', { fruit });
});

// Update Fruit
app.post('/updateFruit', async (req, res) => {
    await Fruit.findByIdAndUpdate(req.body.id, req.body);
    res.redirect('/');
});

// Delete Fruit
app.get('/DeleteFruit', async (req, res) => {
    await Fruit.findByIdAndDelete(req.query.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server started on port 3000");
});
