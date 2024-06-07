const { registarFile, Files, selectFile, salvarContatosSelecionados, updateFile } = require("../services/fileService");
const fs = require("fs");
const baseUrl = "http://localhost:5000/files/";
const crypto = require('crypto'); 
const path = require('path'); 
exports.shareFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const selectedContacts = req.body.contacts;
    const uniquelink = generateUniqueLink(fileId);

    // Salva os contatos selecionados e depois envia a resposta
    const result = await salvarContatosSelecionados(fileId, selectedContacts);
    res.status(result.statusCode).send({ link: uniquelink, ...result });
  } catch (err) {
    // Se ocorrer um erro, envia o erro usando o middleware de erro
    next(err);
  }
};

function generateUniqueLink(fileid) {
  const token = crypto.randomBytes(16).toString('hex');
  return `http://localhost:4200/#/doc/ficheiros/ficheiro/${fileid}?token=${token}`;
}

exports.shareFilesss = async (req, res) => {

  const fileId = req.params.id;
  const selectedContacts = req.body.contacts;// Aqui voce deve implementar a 16gica para salvar os contatos selecionados no banco de dados
  // Gera ao de um link unico para o arquivo 

  const uniquelink = generateUniqueLink(fileId);
  res.send({ link: uniquelink });

  salvarContatosSelecionados(fileId, selectedContacts).then((result) => {
    res.status(result.statusCode).send({ ...result });
  })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
const db = require("../config/database/db");
exports.getListFiles = async (req, res) => {
  const dirname = path.resolve();
  const sql =
    "SELECT files.file_name, files.id, files.type, files.size, files.created_at, pastas.id AS pastas_id, pastas.nome AS pastas_name FROM files INNER JOIN pastas ON files.id_pasta = pastas.id";
  db.query(sql, async (err, results) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (results && results.length > 0) {

      return res.status(200).json(
        await Promise.all(
          results.map(async (file) => {
            const fullfilepath = path.join(dirname, './uploads/' + file.file_name);
            return {
              id: file.id,
              file_name: file.file_name,
              type: file.type,
              url: fullfilepath,
              size: file.size,
              created_at: file.created_at,
              pasta: file.pastas_name
            };
          })
        )
      );
    } else {
      return res.status(404).json({ message: "Nenhum arquivo encontrado." });
    }
  });
}


exports.getListF = async (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

exports.download = async (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

exports.remove = async (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

exports.removeSync = async (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

exports.registar_file = async (req, res, next) => {
  const { file } = req.body;

  registarFile({ file })
    .then((result) => {
      res.status(result.statusCode).send({ ...result });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.update_file = async (req, res, next) => {

  const { file } = req.body;

  updateFile({ file })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

exports.select_file = async (req, res, next) => {

  const { id } = req.params;

  selectFile({ id })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
