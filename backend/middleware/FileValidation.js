const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

 
 
const FileValidation = (data) => {
  const schema = Joi.object({
    file: Joi.string().required().strict(), 
  });

  return schema.validate(data, options);
};
const SelectFileValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required().strict(), 
  });

  return schema.validate(data, options);
};

const FileShareValidation = (data) => {
  const schema = Joi.object({
    file_id: Joi.number().required(),
    contact_ids: Joi.array().items(Joi.number().required()).required()
  });

  // As opções devem ser definidas ou removidas se não forem usadas
  const options = {
    // Defina suas opções aqui, se necessário
  };

  return schema.validate(data, options);
};



module.exports = { 
  FileValidation,
  SelectFileValidation,
  FileShareValidation
};
