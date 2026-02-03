const express = require('express');

const { employeeFormPage, addEmployee, allEmployeePage, deleteEmployee, editEmployeePage, updateEmployee, errorPage } = require("../controllers/emp.controller");

const empRoute = express.Router();

empRoute.get('/', employeeFormPage);
empRoute.post('/addEmp', addEmployee);
empRoute.get('/allEmployeePage', allEmployeePage);

empRoute.get('/deleteEmp', deleteEmployee);

empRoute.get('/editEmp/:empId', editEmployeePage);
empRoute.post('/updateEmp', updateEmployee);

empRoute.get('/error', errorPage);

module.exports = empRoute;