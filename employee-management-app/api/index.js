const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://janysoth:080504*Msj@cluster0.diacm.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import the models
const Employee = require("./models/employee");
const Attendance = require("./models/attendance");

// Endpoint to Register an Employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    // Create a new Employee
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee saved successfully. ", employee: newEmployee });
  } catch (error) {
    console.log("Error in creating an employee. ", error);
    res.status(500).json({ message: "Failed to add an employee." });
  }
});

// Endpoint to Fetch All of the Employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.log("Error in fetching all of the employees. ", error);
    res.status(500).json({ message: "Failed to retrieve all of the employees." });
  }
})




