// ให้chatGPT สร้างโจทให้
// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// in-memory DB
let nextId = 4;
let students = [
  { id: 1, name: "Somchai", major: "IT" },
  { id: 2, name: "Suda",    major: "CS" },
  { id: 3, name: "Arthit",  major: "DS" },
];

// Serve frontend static files (optional)
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// GET /students
app.get("/students", (req, res) => {
  // simulate small delay to observe loading state
  setTimeout(() => res.json(students), 300);
});

// PUT /students/:id  — update student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, major } = req.body;

  if (!name || !major) {
    return res.status(400).json({ error: "name and major required" });
  }

  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });

  students[idx] = { id, name, major };

  // simulate delay
  setTimeout(() => res.json(students[idx]), 300);
});

// fallback: serve index.html for non-API requests (if using same server)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
