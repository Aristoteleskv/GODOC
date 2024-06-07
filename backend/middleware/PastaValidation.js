const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

 
 
const PastaValidation = (data) => {
  const schema = Joi.object({
    nome: Joi.string().required().strict(),
    de: Joi.number().required().strict(), 
  });

  return schema.validate(data, options);
};

module.exports = { 
  PastaValidation, 
};
