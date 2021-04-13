const express = require('express');
const router = express.Router();

const {
  getEmployees,
  getEmployee,
  addNewEmployee,
  modifyEmployee,
  removeEmployee,
} = require('../controllers/employeeController');

// GET employees
// router.get('/api/employees', (req, res, next) => getEmployees(req, res, next)); // original version
router.get('/api/employees', getEmployees); // shorter version

// GET single employee by id
router.get('/api/employees/:id', getEmployee);

// POST a new employee
router.post('/api/employee/add', addNewEmployee);

// PUT to update an employee 
router.put('/api/employees/edit/:id', modifyEmployee);

// DELETE an employee by id
router.delete('/api/employees/:id', removeEmployee);

module.exports = router;
