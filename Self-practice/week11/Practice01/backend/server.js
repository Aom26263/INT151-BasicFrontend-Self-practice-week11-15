// ให้chatGPT สร้างโจทให้
// เเก้เองนิดหน่อย
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

const students = [
  { id: 1, name: "Somchai", major: "IT" },
  { id: 2, name: "Suda", major: "CS" },
  { id: 3, name: "Arthit", major: "DS" },
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
