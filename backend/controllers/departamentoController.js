const { registaDepartamentos, updateDepartamentos} = require("../services/departamentosService");
 
exports.registo_departamentos = async (req, res, next) => {
  const {nome, sigla, id_modulo, status} = req.body;

  registaDepartamentos({nome, sigla, id_modulo, status})
    .then((result) => {
      const { statusCode = 200, message, data, token } = result;
      res.status(statusCode).send({ message, data, token });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};



exports.update_registaDepartamentos = async (req, res, next) => {
  const {id} = req.params;
  const {nome, sigla, id_modulo, status} = req.body;

  updateDepartamentos({id, nome, sigla, id_modulo, status})
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
