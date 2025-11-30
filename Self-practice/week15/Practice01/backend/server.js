// ให้chatGPT สร้างโจทให้
// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const students = [
  { id: 1, name: "Aom", major: "CS" },
  { id: 2, name: "Mew", major: "IT" },
  { id: 3, name: "John", major: "Engineering" }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// POST new student
app.post("/students", (req, res) => {
  const { name, major } = req.body;
  const newStudent = { id: students.length + 1, name, major };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
