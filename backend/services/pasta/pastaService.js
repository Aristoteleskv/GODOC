const { PastaValidation } = require("../../middleware/PastaValidation");
const db = require("../../config/database/db");
const path = require('path'); 
// Include fs and path module 
const fs = require('fs'); 

//CRIAR PASTA
async function pasta(nome){
  try{
     //renomear ficheiros
      fs.mkdir(path.join(__dirname, `../../uploads/${nome}`),
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(err);
        }
         
        console.log('Directory created successfully!');
      });
 
  } catch (error){
      console.error(`movido o ficheiro' ${error.message}`);
  }

  
}
 
exports.registarPasta = async (params) => {
  const { error } = PastaValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };
  const { nome, de } = params;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO pastas (nome, de) VALUES (?,?)`,[nome, de],
      (err) => {
        
        if (err) {
          console.log(err);
          reject({
            message: "Alguma coisa deu errado. Por favor tente outra vez",
            statusCode: 400,
            data: err,
          });
        } else {
          console.log(err);  
          pasta(nome);
         
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


exports.updatePasta = async (params) => {
  const { error } = PastaValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const {id, nome, de } = params;

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM pastas WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result.length === 0) {
          reject({
            message: "Credenciais erradas, tente novamente",
            statusCode: 400,
          });
        } else {
          if (nome === result[0].nome && de === result[0].de) {
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

exports.getSPasta = async (params) => {
   
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const {id} = params;

  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM pastas WHERE id = ${id}`,
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

exports.deleteSPasta = async (params) => {
   
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const {id} = params;

  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM pastas WHERE id = ${id}`,
      (err, results) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (err) console.log(err);
        else resolve({
          message: "pasta deletado com sucesso",
          data: results,
        });
        json(results[0]);
      }
    );
  });
};
  