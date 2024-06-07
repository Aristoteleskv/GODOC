const {
    getPedidos,
    getSinglePedido,
    createPedido,
  } = require("../services/pedidoService");
  
  exports.create_pedido = async (req, res, next) => {
    const { userId, cart } = req.body;
    createPedido({ userId, cart })
      .then((result) => {
        res.status(result.statusCode).send({ ...result });
      })
      .catch((err) => {
        const { statusCode = 400, message } = err;
        res.status(statusCode).send({ message }) && next(err);
      });
  };
  
  exports.get_single_pedido = async (req, res, next) => {
    const { pedidoId, userId } = req.query;
    getSinglePedido({ pedidoId, userId })
      .then((result) => {
        const { message, data } = result;
        res.status(200).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message } = err;
        res.status(statusCode).send({ message }) && next(err);
      });
  };
  
  exports.get_pedidos = async (req, res, next) => {
    const { userId } = req.query;
    getPedidos({ userId })
      .then((result) => {
        const { message, data } = result;
        res.status(200).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message } = err;
        res.status(statusCode).send({ message }) && next(err);
      });
  };
  