const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

 
 
const NotificacoesValidation = (data) => {
  const schema = Joi.object({
    menssagem: Joi.string().required().strict(), 
  });

  return schema.validate(data, options);
};

module.exports = { 
  NotificacoesValidation, 
};
