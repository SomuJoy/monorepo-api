const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    userId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    education: { type: String, required: true },
    company: { type: String, required: true },
    experience: { type: Number, required: true },
    package: { type: Number, required: true }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
