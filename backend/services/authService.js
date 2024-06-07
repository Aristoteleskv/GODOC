const {
  loginValidation,
  registerValidation,
} = require("../middleware/validation");
const db = require("../config/database/db"); 
const jwt = require('jsonwebtoken');
const md5 = require("md5");
const nodeMailer = require("nodemailer");
const { GetUserPermissions, GetUserRole, GetUserModulo } = require("../middleware/validationUser");
const token = require("../middleware/token"); 
// Configure our transport using env settings



exports.loginUser = async (params) => {
  const { error } = loginValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { email, password } = params;
  const hashedPassword = md5(password.toString()); 
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, hashedPassword],
      async (err, result) => {
        if (err) {
          reject({
            message: "Alguma coisa deu errado. Por favor tente outra vez",
            statusCode: 400,
          });
        } else if (result.length === 0) {
          reject({
            message: "Credenciais erradas, tente novamente",
            statusCode: 400,
          });
        } else {
          const user = result[0];
          const permissions = await GetUserPermissions(user.username);
          const role = await GetUserRole(user.username);
          const modulo = await GetUserModulo(user.username); 

          resolve({
            message: "Conectado com sucesso",
            data: {
              id: user.id,
              foto: user.foto,
              nome: user.full_name,
              username: user.username, 
              token: token.generate(
                result[0].user_id,
                result[0].username,
                role,
                permissions
              ),
              email: user.email,
              role_id: user.role_id,
              role,
              modulo,
              permissions,
            }
          }); 
        }
      }
    );
  });
};









exports.registerUser = async (params) => {
  const { error } = registerValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { fullName, telefone, email, password } = params;
  const hashedPassword = md5(password.toString());
  var randNum = Math.floor(Math.random() * 100 * 100);
  const codigo = randNum.toString().substr(0, 14);




  const verifyCode = codigo;

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT email FROM users WHERE email = ?`,
      [email],
      (err, result) => {
        if (result.length > 0) {
          reject({
            message: "O endereço de e-mail está em uso, tente outro",
            statusCode: 400,
          });
        } else if (result.length === 0) {
          db.query(
            `INSERT INTO users (full_name, username, telefone, email, password ,codigo) VALUES (?,?,?,?,?,?)`,
            [fullName, telefone, email, hashedPassword, codigo],
            (err, result) => {
              //Envio de Email

              //Envio de SMS

              if (err) {
                reject({
                  message: "Alguma coisa deu errado. Por favor tente outra vez",
                  statusCode: 400,
                  data: err,
                });
              } else {
                const token = jwt.sign({ data: result }, "secret");
                resolve({
                  data: result,
                  message: "Credenciais erradas caralho, tente novamente.",
                  token: token,
                  statusCode: 200,
                });
              }
            }
          );
        }
      }
    );
  });
};
