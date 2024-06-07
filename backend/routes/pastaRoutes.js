const express = require("express");
const router = express.Router();
const db = require("../config/database/db");

 
const pastaController = require("../controllers/pastaController");

router.post("/registo", pastaController.registar_pasta);
router.get("/", pastaController.getListPastas);
router.post("/update", pastaController.update_pasta);
router.put("/de/:id", pastaController.delete_pasta);
router.get("/:id", getSPasta);

async function getSPasta(req, res) {
    const { id } = req.params;
    db.query(
      `SELECT * FROM pastas WHERE id = ${id}`,
      (err, results) => {
        if (err) console.log(err);
        else res.json(results[0]);
      }
    );
  }



module.exports = router;
