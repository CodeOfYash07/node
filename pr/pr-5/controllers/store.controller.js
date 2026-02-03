const Store = require('../models/ruit.models');
const multer = require("multer");
const fs = require("fs");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// VIEW
const homePage = async (req, res) => {
    const allstores = await Store.find();
    res.render('viewstore', { allstores });
};

// ADD PAGE
const addstorePage = (req, res) => {
    res.render('addstore');
};

// INSERT (✅ IMAGE STORED + PATH SAVED)
const insertstore = async (req, res) => {
    await Store.create({
        storeName: req.body.storeName,
        storePrice: req.body.storePrice,
        storeImage: req.file ? req.file.filename : null
    });
    res.redirect('/');
};

// EDIT PAGE
const editstorePage = async (req, res) => {
    const store = await Store.findById(req.params.id);
    res.render('editstore', { store });
};

// UPDATE (OPTIONAL IMAGE UPDATE - FIXED LOGIC)
const updatestore = async (req, res) => {

    // get old store data
    const oldStore = await Store.findById(req.body.id);

    const data = {
        storeName: req.body.storeName,
        storePrice: req.body.storePrice
    };

    // if new image uploaded
    if (req.file) {

        // delete old image if exists
        if (oldStore.storeImage) {
            const oldImagePath = path.join(__dirname, "..", "uploads", oldStore.storeImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // save new image name
        data.storeImage = req.file.filename;
    }

    await Store.findByIdAndUpdate(req.body.id, data);
    res.redirect('/');
};


// DELETE
const deletestore = async (req, res) => {
    const store = await Store.findById(req.params.id);

    if (store.storeImage) {
        const imgPath = path.join(__dirname, "..", "uploads", store.storeImage);
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
        }
    }

    await Store.findByIdAndDelete(req.params.id);
    res.redirect('/');
};


module.exports = {
    homePage,
    addstorePage,
    insertstore,
    editstorePage,
    updatestore,
    deletestore,
    upload
};
