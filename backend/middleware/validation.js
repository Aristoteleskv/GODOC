const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().strict(),
    telefone: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
    fullName: Joi.string().required().strict(),
  });

  return schema.validate(data, options);
};




const departamentosValidation = (data) => {
  const schema = Joi.object({
    nome: Joi.string().required().strict(),
    sigla: Joi.string().required().strict(),
    id_modulo: Joi.number().required().strict(), 
    status: Joi.string().required().strict(), 
  });

  return schema.validate(data, options);
};
const updateDepartamentosValidation = (data) => {
  const schema = Joi.object({
    nome: Joi.string().required().strict(),
    sigla: Joi.string().required().strict(),
    id_modulo: Joi.number().required().strict(), 
    status: Joi.string().required().strict(), 
  });

  return schema.validate(data, options);
};
module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
  departamentosValidation,
  updateDepartamentosValidation
};
