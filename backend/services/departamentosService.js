const { departamentosValidation, updateDepartamentosValidation } = require("../middleware/validation");
const db = require("../config/database/db");

exports.registaDepartamentos = async (params) => {
  const { error } = departamentosValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };
  const { nome, sigla, id_modulo, status} = params;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO departamentos (nome, sigla, id_modulo, status) VALUES (?,?,?,?)`,
      [nome, sigla, id_modulo, status],
      (err, result) => {
        if (err) {
          console.log(usersid);
          reject({
            message: "Alguma coisa deu errado. Por favor tente outra vez",
            statusCode: 400,
            data: err,
          });
        } else {
          resolve({
            data: result,
            message: "Os dados erradas, tente novamente.",
            statusCode: 200,
          });
        }
      }
    );
  });
};


exports.updateDepartamentos = async (params) => {
  const { error } = updateDepartamentosValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { id, nome, sigla, id_modulo, status} = params;
 

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM departamentos WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result.length === 0) {
          reject({
            message: "Credenciais erradas, tente novamente",
            statusCode: 400,
          });
        } else {
          if (title === result[0].title && description === result[0].description && image === result[0].image && quantidade === result[0].quantidade && price === result[0].price && short_desc === result[0].short_desc) {
            reject({
              message: "Nenhum dado novo foi fornecido",
              statusCode: 400,
            });
          }

          let query = "";

          if (title !== result[0].title && description !== result[0].description && image !== result[0].image && quantidade !== result[0].quantidade && price !== result[0].price && short_desc !== result[0].short_desc) {
            query = `title = '${title}', description = '${description}', image = '${image}', quantidade = '${quantidade}', price = '${price}', short_desc = '${short_desc}'`;
          } else if (title !== result[0].title) {
            query = `title = '${title}'`;
          } 

          db.query(
            `UPDATE products SET ${query} WHERE id = ?`,
            [id],
            (err, result) => {
              if (err) throw { message: err, statusCode: 500 };
              resolve({
                message: "Os detalhes do produto foram atualizados com sucesso",
                data: result,
              });
            }
          );
        }
      }
    );
  });
};








 