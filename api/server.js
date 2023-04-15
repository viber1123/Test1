const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testcrud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM tache";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO tache (`Nom`, `Description`) VALUES (?)";
  const values = [req.body.nom, req.body.description];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "update tache set `Nom` = ?, `Description` = ? where ID = ?";
  const values = [req.body.nom, req.body.description];
  const id = req.params.id;
  
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.delete("/tache/:id", (req, res) => {
  const sql = "DELETE FROM tache WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.listen(8085, () => {
  console.log("listening");
});
