const express = require("express");
const router = express.Router();
const db = require("../../config/database/db");   

 
  
//get pastas
router.get("/",(req, res) => {
  db.query(
    `select * from roles`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );

});
 
 
//get pastas
router.get("/df",(req, res) => {
  db.query(
    `select p.id, p.nome, c.nome as docfiles FROM pastas p JOIN docfiles c ON c.id = p.id WHERE p.id_modelo`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );
});

 
module.exports = router;
