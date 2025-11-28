// ให้chatGPT สร้างโจทให้
// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Somchai", major: "IT" },
  { id: 2, name: "Suda", major: "CS" },
  { id: 3, name: "Arthit", major: "DS" }
];

// GET — list all students
app.get("/students", (req, res) => {
  res.json(students);
});

// DELETE — delete student by ID
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  students.splice(index, 1);
  res.json({ message: "deleted" });
});

// Start server
app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
