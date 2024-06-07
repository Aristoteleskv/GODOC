const { registarPasta, updatePasta, deleteSPasta } = require("../services/pasta/pastaService");
const db = require("../config/database/db");
 

exports.registar_pasta = async (req, res, next) => {
  const { nome, de} = req.body;

  registarPasta({ nome, de})
    .then((result) => {
      const { statusCode = 200, message, data} = result;
      res.status(statusCode).send({ message, data});
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};


exports.update_pasta = async (req, res, next) => {
   
    const { nome, de } = req.body;
  
    updatePasta({ nome, de })
      .then((result) => {
        const { statusCode = 200, message, data } = result;
        res.status(statusCode).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message, data } = err;
        res.status(statusCode).send({ message, data }) && next(err);
      });
  };


  exports.get_pasta = async (req, res) => {
   
    const { nome, de } = req.body;
  
    updatePasta({ nome, de })
      .then((result) => {
        const { statusCode = 200, message, data } = result;
        res.status(statusCode).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message, data } = err;
        res.status(statusCode).send({ message, data }) && next(err);
      });
  };


  exports.delete_pasta = async (req, res) => {
   
    const { id } = req.body;
  
    deleteSPasta({ id })
      .then((result) => {
        const { statusCode = 200, message, data } = result;
        res.status(statusCode).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message, data } = err;
        res.status(statusCode).send({ message, data }) && next(err);
      });
  };


 
 
 
 //get pastas
  exports.getListPastas = async (req, res) => {
    try {
      const { page = 0, limit = 20 } = req.query;
      const startValue = (page > 0) ? (page - 1) * limit : 0;

      db.query(
        `SELECT 
          pastas.id AS id,
          pastas.nome AS nome,
          users.username,
          files.file_name,
          files.id AS file_id,
          files.type,
          files.size,
          files.created_at
        FROM 
          pastas
        LEFT JOIN users ON users.id = pastas.de
        LEFT JOIN files ON pastas.id = files.id_pasta
        LIMIT ?, ?`, [startValue, parseInt(limit)],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
          }
          res.json(results);
        }
      );
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
     
   
  }
 
 

  
   exports.getSPasta = async (req, res) => {
    const { id } = req.query;
    db.query(
      `SELECT * FROM pastas WHERE id = ${id}`,
      (err, results) => {
        if (err) console.log(err);
        else res.json(results[0]);
      }
    );
  }