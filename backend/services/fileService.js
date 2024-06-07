const { FileValidation ,SelectFileValidation, FileShareValidation} = require("../middleware/FileValidation");
const multer = require('multer');
const path = require('path');
const db = require("../config/database/db");
const socket = require('socket.io');
const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname;

    let ext = originalname.split('.').pop();
    let filename = originalname.split('.').slice(0, -1).join('.');

    cb(null, filename + '-' + Date.now() + '.' + ext)
  }
});

let upload = multer({ storage: store }).single('file');

exports.Files = async (req, res) => {
  const io = socket(req.get('socketio'));
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM files WHERE `, (err, result) => {
      if (err) {
        reject({ message: err, statusCode: 500 });
      } else {
        resolve({
          message: "sucesso",
          data: result,
        });
        // Emit an event with the result
        io.emit('files', result);
      }
    });
  });
};

exports.getFile = async (params) => {
  const { error } = FileValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };
  const { de , idPasta, idPara, dataEntrada } = params;
  console.log(req.body); 
  const file = params.file;
  const file_name = file.filename;
  const type = file.mimetype;
  const size = file.size;
  const tmp_name = file.filename;
  upload(params, params, function(){});
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO files (file_name, type, size, tmp_name, de , idPasta, idPara, dataEntrada) VALUES (?,?,?,?,?,?,?,?)`,[file_name, type, size, tmp_name, de , idPasta, idPara, dataEntrada],
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
           
            
          resolve({
            data: err,
            message: "Os dados erradas, tente novamente.",
            statusCode: 200,
          });
        }
      }
    );
  });
};

exports.registarFile = async (params) => {
  const { error } = FileValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };
  const { de , idPasta, idPara, dataEntrada } = params;
  console.log(req.body); 
  const file = params.file;
  const file_name = file.filename;
  const type = file.mimetype;
  const size = file.size;
  const tmp_name = file.filename;
  upload(params, params, function(){});
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO files (file_name, type, size, tmp_name, de , idPasta, idPara, dataEntrada) VALUES (?,?,?,?,?,?,?,?)`,[file_name, type, size, tmp_name, de , idPasta, idPara, dataEntrada],
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
           
            
          resolve({
            data: err,
            message: "Os dados erradas, tente novamente.",
            statusCode: 200,
          });
        }
      }
    );
  });
};
// Função para salvar contatos selecionados no banco de dados
exports.salvarContatosSelecionados = async (file_id, contact_id) => {
  const { error } = FileShareValidation(file_id, contact_id);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  try {
    const query = 'INSERT INTO shared_files (file_id, contact_id) VALUES ?';
    const values = contact_id.map(contact => [file_id, contact.id]);
    const [results] = await db.promise().query(query, [values]);
    return {
      message: "Contatos salvos com sucesso.",
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    throw {
      message: "Erro ao salvar contatos: " + error.message,
      statusCode: 500,
      data: error,
    };
  }  
};

exports.salvarContatosSe = async (file_id, contact_id) => {
  const { error } = FileShareValidation(file_id, contact_id);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO shared_files (file_id, contact_id) VALUES ?';
    const values = selectedContacts.map(contact => [file_id, contact.id]);
    db.query(query, [values], function(error, results) {
      if (error) {
        // Tratar o erro
        reject({
          message: "Erro ao salvar contatos: Alguma coisa deu errado. Por favor tente outra vez",
          statusCode: 500, // Código de status alterado para refletir um erro do servidor
          data: error,
        });
      } else {
        // Sucesso
        resolve({
          message: "Contatos salvos com sucesso.",
          statusCode: 200,
        });
      }
    });
  });
}

exports.salvarContatos = async (file_id, contact_id, next) => {
  const { error } = FileShareValidation(file_id, contact_id);
  if (error) throw { message: error.details[0].message, statusCode: 400 };
  // Supondo que você esteja usando o MySQL e tenha uma tabela chamada 'shared_files'
  return new Promise((resolve, reject) => {
   const query = 'INSERT INTO shared_files (file_id, contact_id) VALUES ?';
  const values = selectedContacts.map(contact => [file_id, contact.id]);
   db.query(query, [values], function(error, results, next) {
    if (error) {
      // Tratar o erro 
      reject({
        message: "Erro ao salvar contatos: Alguma coisa deu errado. Por favor tente outra vez",
        statusCode: 400,
        data: error,
      });
    } else {
      // Sucesso
       resolve({
        data: error,
        message: "Contatos salvos com sucesso.",
        statusCode: 200,
      });
    }
  });
  });
  
}

exports.updateFile = async (params) => {
  const { error } = PastaValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { id, nome, de } = params;

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

exports.selectFile = async (req, res) => {
  const { error } = SelectFileValidation(req.params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { id} = req;

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM files WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });
        resolve({
          message: " sucesso",
          data: result,
        });
      }
    );
  });
};

exports.download = async (req, res) => {
  filepath = path.join(__dirname, './uploads') + '/' + req.body.filename;
  res.sendFile(filepath);
};