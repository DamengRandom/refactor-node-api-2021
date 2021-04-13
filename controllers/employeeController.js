// put all employee routes together
const Employee = require('../models/employee');
const ApiError = require('../error/ApiError');

// GET employees
const getEmployees = (req, res, next) => {
  Employee.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      next(ApiError.badRequest(`Error for fetching /api/employees, details are: ${err}`));
      return; // stop the program when error detected .. 
    }
  });
};

// GET single employee by id
const getEmployee = (req, res, next) => {
  Employee.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      next(ApiError.badRequest(`Error for fetching /api/employees/:id, details are: ${err}`));
      return; // stop the program when error detected .. 
    }
  });
};

// POST a new employee
const addNewEmployee = (req, res, next) => {
  const { name, email, salary } = req.body;
  const employeeObject = new Employee({
    name,
    email,
    salary,
  });

  employeeObject.save((err, data) => {
    if (!err) {
      res.status(201).json({
        code: 201,
        message: `employee ${name} has been added into database successfully.`,
        addedEmployee: data,
      });
    } else {
      next(ApiError.badRequest(`Error for creating /api/employee/add, details are: ${err._message}`));
      return; // stop the program when error detected .. 
    }
  });
};

// PUT to update an employee
const modifyEmployee = (req, res, next) => {
  const { name, email, salary } = req.body;
  const newUpdatedObject = {
    name,
    email,
    salary,
  };

  Employee.findByIdAndUpdate(req.params.id, {$set: newUpdatedObject}, {new: true}, (err, data) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: `employee ${data.name} has been updated database successfully.`,
        updatedEmployee: data,
      });
    } else {
      next(ApiError.badRequest(`Error for updating /api/employees/edit/${data.id}, details are: ${err}`));
      return; // stop the program when error detected .. 
    }
  });
};

// DELETE an employee by id
const removeEmployee = (req, res, next) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: `employee ${data.name} has been removed from database successfully.`,
      });
    } else {
      next(ApiError.badRequest(`Error for deleting /api/employees/${req.params.id}, details are: ${err}`));
      return; // stop the program when error detected .. 
    }
  });
};

module.exports = {
  getEmployees,
  getEmployee,
  addNewEmployee,
  modifyEmployee,
  removeEmployee,
};
