const { NotificacoesValidation } = require("../middleware/notifiValidation");
const db = require("../config/database/db");
 
exports.registarNotificacoes = async (params) => { 
  const { de, para,shared_file_id, mensagem } = params;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO notificacoes (de, para,shared_file_id, mensagem) VALUES (?,?,?,?)`,[de, para,shared_file_id, tipo, mensagem],
      (err) => {
        if (err) { 
          reject({
            message: "Alguma coisa deu errado. Por favor tente outra vez",
            statusCode: 400,
            data: err,
          });
        } else { 
          resolve({
            data: err,
            message: "Os dados certinho",
            statusCode: 200,
          });
        }
 
      }
    );
  });
};

 

exports.updateNotificacoes = async (params) => {
  const { error } = PastaValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const {id, nome, de } = params;

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM notificacoes WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result.length === 0) {
          reject({
            message: "Credenciais erradas, tente novamente",
            statusCode: 400,
          });
        } else {
          if (email === result[0].email && de === result[0].de) {
            reject({
              message: "Nenhum dado novo foi fornecido",
              statusCode: 400,
            });
          }

          let query = "";

          if (nome !== result[0].nome) {
            query = `nome = '${nome}',`;
          } 

          db.query(
            `UPDATE pastas SET ${query} WHERE id = ?`,
            [id],
            (err, result) => {
              if (err) throw { message: err, statusCode: 500 };
              resolve({
                message: "pasta atualizada com sucesso",
                data: result,
              });
            }
          );
        }
      }
    );
  });
};
exports.getSsta = async (params) => {
   
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const {id} = params;

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM notificacoes WHERE de = ${id}`,
      (err, results) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (err) console.log(err);
        else resolve({
          message: "pasta atualizada com sucesso",
          data: results,
        });
        json(results[0]);
      }
    );
  });
};
  
