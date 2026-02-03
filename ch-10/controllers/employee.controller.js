// controllers/emp.controller.js
const Employee = require('../models/employee.model');

const employeeFormPage = (req, res) => {
    res.render('employee-form');
};

const addEmployee = async (req, res) => {
    try {
        const { name, email, phone, salary, designation } = req.body;
        const newEmployee = new Employee({ name, email, phone, salary, designation });
        await newEmployee.save();
        res.redirect('/employee/allEmployeePage');
    } catch (error) {
        console.error(error);
        res.redirect('/employee/error');
    }
};

const allEmployeePage = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('all-employees', { employees });
    } catch (error) {
        console.error(error);
        res.redirect('/employee/error');
    }
};

const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.id);
        res.redirect('/employee/allEmployeePage');
    } catch (error) {
        console.error(error);
        res.redirect('/employee/error');
    }
};

const editEmployeePage = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.empId);
        res.render('edit-employee', { employee });
    } catch (error) {
        console.error(error);
        res.redirect('/employee/error');
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id, name, email, phone, salary, designation } = req.body;
        await Employee.findByIdAndUpdate(id, { name, email, phone, salary, designation });
        res.redirect('/employee/allEmployeePage');
    } catch (error) {
        console.error(error);
        res.redirect('/employee/error');
    }
};

const errorPage = (req, res) => {
    res.render('error');
};

module.exports = {
    employeeFormPage,
    addEmployee,
    allEmployeePage,
    deleteEmployee,
    editEmployeePage,
    updateEmployee,
    errorPage
};