const express = require('express');
const router = express.Router();
const storeCtrl = require('../controllers/store.controller');

const {
    homePage,
    addstorePage,
    insertstore,
    editstorePage,
    updatestore,
    deletestore,
    upload          // ✅ IMPORT upload
} = require('../controllers/store.controller');

router.get('/', homePage);

router.get('/Addstore', addstorePage);
router.post('/addstore', upload.single("storeImage"), insertstore);

router.get('/Editstore/:id', editstorePage);
router.post('/updatestore', upload.single("storeImage"), updatestore);

router.get('/Deletestore/:id', deletestore);

module.exports = router;
