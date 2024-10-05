const express = require('express');
const { addEmployee, getAllEmployees } = require('../controllers/employeeController');

const router = express.Router();

// Route to add a new employee
router.post('/add', addEmployee);

// Route to get all employees
router.get('/all', getAllEmployees);

module.exports = router;
