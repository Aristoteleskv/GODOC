const {
    getPermission 
  } = require("../services/pedidoService");
  

exports.get_permission = async (req, res, next) => {
    const { Id } = req.query;
    getPermission({ Id })
      .then((result) => {
        const { message, data } = result;
        res.status(200).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message } = err;
        res.status(statusCode).send({ message }) && next(err);
      });
  };
  