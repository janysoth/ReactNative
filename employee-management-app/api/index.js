const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

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
});

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Employee.deleteOne({ employeeId: id });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).send({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting employee' });
  }
});

app.post("/attendance", async (req, res) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;

    const existingAttendance = await Attendance.findOne({ employeeId, date });

    if (existingAttendance) {
      existingAttendance.status = status;

      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        date,
        status,
      });

      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: "Error in submitting attendance." });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    // Find Attendance records for the specified date
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching attendance data." });
  }
});

app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;
    console.log("Query parameters: ", month, year);

    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD").startOf("month").toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate Attendance Data for all employees and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $month: { $dateFromString: { dateString: "$date" } }
                  },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  {
                    $year: { $dateFromString: { dateString: "$date" } }
                  },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },
      // End of $match

      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      // End of $group

      {
        $lookup: {
          from: "employees", // Name of the employee collection
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      // End of $lookup

      {
        $unwind: "$employeeDetails", // Unwind the employeeDetails array
      },
      // End of #unwind

      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          holiday: 1,
          name: "$employeeDetails.employeeName",
          designation: "$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId",
        },
      },
      // End of $project
    ]);

    res.status(200).json({ report });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching Attendance Summary Report. " });
  }
})


