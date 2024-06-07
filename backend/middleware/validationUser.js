var { jwtDecode } = require("jwt-decode"); ;
const db = require("../config/database/db");  
var { expressjwt: jwt } = require("express-jwt");
const secretKey = '1442'; // Substitua pela sua chave secreta real

function GetUserPermissions(username) {
  return new Promise((resolve) => {
    const sql =
      "select permissions.name from `users`, `roles`, `permissions` where username = ? and users.role_id = roles.id and roles.id = permissions.id";
      db.query(sql, [username], (err, result) => {
      if (err) {
        console.log(err);
        resolve([]);
      }

      if (result && result.length === 0) {
        resolve([]);
      }

      if (result && result.length > 0) {
        const permissions = result.map((res) => res.name);
        resolve(permissions);
      }
    });
  });
}
function GetUserRole(username) {
  return new Promise((resolve) => {
    const sql =
      "select roles.id, roles.name from `users`, `roles` where username = ? and users.role_id = roles.id";
      db.query(sql, [username], (err, result) => {
        if (err) {
          console.error(err);
          resolve(null);
        } else if (result && result.length > 0) {
          // Supondo que img e sigla são nomes de colunas na tabela role
          const roleInfo = {
            id: result[0].id,
            name: result[0].name
          };
          resolve(roleInfo);
        } else {
          resolve(null);
        }
    });
  });
}


function GetUserModulo(username) {
  return new Promise((resolve) => {
    // Modifique a consulta SQL para selecionar id, img e sigla
    const sql = `
      SELECT modulos.id, modulos.img, modulos.sigla 
      FROM users, roles, modulos 
      WHERE users.role_id = roles.id 
      AND roles.modulo_id = modulos.id 
      AND username = ?`;

    db.query(sql, [username], (err, result) => {
      if (err) {
        console.error(err);
        resolve(null);
      } else if (result && result.length > 0) {
        // Supondo que img e sigla são nomes de colunas na tabela modulos
        const moduloInfo = {
          id: result[0].id,
          img: result[0].img,
          sigla: result[0].sigla
        };
        resolve(moduloInfo);
      } else {
        resolve(null);
      }
    });
  });
}


module.exports.ValidateUser = async function (req, permission) {
  if (!req.headers || !req.headers.authorization) {
    return false;
  }

  try {
    const tokenParts = req.headers.authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new Error('Formato do token inválido');
    }
    const token = tokenParts[1];
    var decoded = jwt.verify(token, secretKey);
    const permissions = await this.GetUserPermissions(decoded.username);
    return permissions && permissions.includes(permission);
  } catch (error) {
    console.error('Erro ao validar o token:', error.message);
    return false;
  }
};


 
module.exports.ValidateUser6 = async function (req, permission) {
  if (!req.headers || !req.headers.authorization) return false;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);
  const permissions = await this.GetUserPermissions(decoded.username);
  return permissions.includes(permission);
};
module.exports.GetUserPermissions = GetUserPermissions;
module.exports.GetUserRole = GetUserRole;
module.exports.GetUserModulo = GetUserModulo;
