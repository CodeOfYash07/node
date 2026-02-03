const express = require('express');
const { Emp, EmpFoarm } = require('../controllers/Emp.controller');

const route = express.Router();

console.log("Routing");

route.get('/', EmpFoarm );

module.exports = route;