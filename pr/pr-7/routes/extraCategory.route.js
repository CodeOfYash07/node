const express = require('express');
const { addExtraCategoryPage, addExtraCategory, viewExtraCategoryPage, deleteExtraCategory, editExtraCategoryPage, editExtraCategory } = require('../controller/extracategory.controller');

const extraCategoryRoutes = express.Router();

extraCategoryRoutes.get('/addExtraCategoryPage', addExtraCategoryPage);
extraCategoryRoutes.post('/addExtraCategory', addExtraCategory);
extraCategoryRoutes.get('/viewExtraCategoryPage', viewExtraCategoryPage);
extraCategoryRoutes.get('/deleteExtraCategory/:id', deleteExtraCategory);
extraCategoryRoutes.get('/editExtraCategory/:id', editExtraCategoryPage);
extraCategoryRoutes.post('/editExtraCategory/:id', editExtraCategory);

module.exports = extraCategoryRoutes;
