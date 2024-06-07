const express = require("express");
const router = express.Router();
const db = require("../config/database/db");
const departamentoController = require("../controllers/departamentoController");


router.put("/:id", departamentoController.update_registaDepartamentos);
router.post("/registo", departamentoController.registo_departamentos);

// GET ALL departamentos
router.get("qwerty/", async (req, res) => {

  db.query(`SELECT * FROM departamentos`,
      (err, results) => {
          if (err) console.log(err);
          else res.json(results);
      });

});

// GET ALL departamentos associative
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  let startValue;

  if (page > 0) {
    startValue = page * limit - limit; // 0,10,20,30
  } else {
    startValue = 0;
  }

  db.query(
    `SELECT departamentos.id,
    departamentos.nome AS nome_departamento,
    departamentos.sigla AS sigla_departamento,
    gabinetes.nome AS nome_gabinete,
    gabinetes.sigla AS sigla_gabinete,
    users.id AS id_usuario,
    users.username AS nome_usuario
  FROM 
    departamentos
  LEFT JOIN 
    gabinetes ON departamentos.id = gabinetes.id_dp
  LEFT JOIN 
    users ON gabinetes.id = users.id_gabinete
     LIMIT ${startValue}, ${limit}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.json(results);
      }
    }
  );
});


// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  db.query(
    `SELECT p.id, p.title, p.image, p.description, p.quantidade, p.price, p.short_desc, p.cat_id,
        c.title as category FROM products p JOIN categories c ON
            c.id = p.cat_id WHERE p.id = ${productId}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results[0]);
    }
  );
});




//eliminar
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(`delete from products where id = '${id}'`, (err, results) => {
    if (err) console.log(err);
    else res.json(results[0]);
  });
});

//modificar

//----------------------------------

module.exports = router;
