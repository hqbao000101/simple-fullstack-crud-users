import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.listen(8080);

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  conn.query(sql, (err, data) => {
    if (err) return res.json("Cannot get students from backend server!");
    return res.json(data);
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM student WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    if (err) return res.json("Cannot get the student by ID!");
    return res.json(data);
  });
});

app.post("/add-student", (req, res) => {
  const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  conn.query(sql, [values], (err, data) => {
    if (err) return res.json("Cannot create the student!");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET name = ?, email = ? WHERE id = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  conn.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Cannot update the student!");
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;
  conn.query(sql, [id], (err, data) => {
    if (err) return res.json("Cannot delete the student!");
    return res.json(data);
  });
});
