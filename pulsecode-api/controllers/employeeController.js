const Employee = require('../models/employeeModel');

// Add a new employee
const addEmployee = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, dateOfBirth, gender, education, company, experience, package } = req.body;

        const newEmployee = new Employee({
            userId,
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            education,
            company,
            experience,
            package
        });

        await newEmployee.save();
        return res.status(200).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json({ employees });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Export controller functions
module.exports = {
    addEmployee,
    getAllEmployees
};
