const { updateUser } = require("../services/userService");
const validate = require("../middleware/validationUser");
const db = require("../config/database/db");
const token = require("../middleware/token");

exports.update_user = async (req, res, next) => {
  const { userId } = req.params;
  const { fullName, email, password } = req.body;

  updateUser({ userId, fullName, email, password })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};


exports.getAllUsers = async (req, res) => {
  //const check_permission = await validate.ValidateUser(req, "read_users");
  //if (!check_permission) return res.status(401).json("Unauthorized");

  const sql =
    "select users.username,  users.id, users.password, users.email, users.full_name, users.user_id, roles.id as role_id, roles.name as role_name, modulos.id as modulo_id, modulos.nome as modulo_nome, modulos.img as modulo_img, permissions.id as permission_id, permissions.name as permission_name from `users`, `roles`, `modulos`, `permissions` where users.role_id = roles.id and roles.id = modulos.id and roles.id = permissions.id";
  db.query(sql, async (err, results) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (results && results.length > 0) {
      return res.status(200).json(
        await Promise.all(
          results.map(async (user) => {
            const permissions = await validate.GetUserPermissions(
              user.username
            );
            const role = await validate.GetUserRole(user.username);
            return {
              full_name: user.full_name,
              username: user.username,
              id: user.id,
              user_id: user.user_id,
              email: user.email,
              password: user.password,
              role,
              modulo: user.role_id,
              modulo: user.modulo_nome,
              modulo_img: user.role_id,
              modulo_img: user.modulo_img,
              permissions,
            };
          })
        )
      );
    }
  });
}

exports.getUser = async (req, res) => { 
  const sql = `SELECT users.username,  users.id, users.password, users.email, users.full_name, users.user_id, roles.id as role_id, roles.name as role_name, modulos.id as modulo_id, modulos.nome as modulo_nome, modulos.img as modulo_img, permissions.id as permission_id, permissions.name as permission_name from users, roles, modulos, permissions where users.role_id = roles.id and roles.id = modulos.id and roles.id = permissions.id and users.id`;
  db.query(sql, [req.body.id], async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (result) {

      const permissions = await validate.GetUserPermissions(result[0].username);
      const role = await validate.GetUserRole(result[0].username);
            return res.status(200).json({
        user: {
          username: result[0].username,
          foto: result[0].foto,
          token: token.generate(
            result[0].id,
            result[0].username,
            role,
            permissions
          ),
          user_id: result[0].user_id,
          email: result[0].email,
          role_id: result[0].role_id,
          modulo: result[0].role_id,
          modulo: result[0].modulo_nome,
          modulo_img: result[0].modulo_img, 
          role,
          permissions,
        },
      });
    }
  });
}

exports.addUser = async (req, res) => {
  const check_permission = await validate.ValidateUser(req, "create_users");
  if (!check_permission) return res.status(401).json("Unauthorized");
  
  const user = {
    username: req.body.username,
    password: md5(req.body.password.toString()),
    email: req.body.email,
    role_id: req.body.role || 2,
  };

  const checkDataSql =
    "SELECT username, email FROM `users` WHERE `username` = ? OR `email` = ?";
    db.query(checkDataSql, [user.username, user.email], (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (result && result.length > 0) {
      let err = new Error();
      err.message = "User already was created";
      return res.status(400).json(err.message);
    }

    if (!err && result.length === 0) {
      const sql = "INSERT INTO `users` SET ? ";
      db.query(sql, user, (err) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(200).json("Success");
      });
    }
  });
}

exports.editUser = async (req, res) => {
  const check_permission = await validate.ValidateUser(req, "update_users");
  if (check_permission) return res.status(401).json("Unauthorized");

  const user_id = req.params.id;
  const user = req.body;

  const checkDataSql =
    "SELECT username, email FROM `users` WHERE `user_id` = ?";
    db.query(checkDataSql, [user_id], (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (!result) {
      let err = new Error();
      err.message = "User not Found";
      return res.status(400).json(err.message);
    }

    if (!err && result.length > 0) {
      const sql =
        "update `users` set username = ?, email = ?, role_id = ? where `user_id` = ?";
        db.query(
        sql,
        [user.username, user.email, user.role, user_id],
        (err) => {
          if (err) {
            return res.status(400).json(err);
          }
          const sql = "DELETE FROM `permissions` WHERE `role_id` = ?";
          db.query(sql, [user.role], async (err) => {
            if (err) {
              return res.status(400).json(err);
            }
            await Promise.all(
              user.permissions.map(async (permission) => {
                db.query(
                  `INSERT IGNORE INTO permissions (name, role_id) Values ('${permission}', ${user.role})`
                );
              })
            );
            return res.status(200).json("Success");
          });
        }
      );
    }
  });
}

exports.deleteUser = async (req, res) => {
  const check_permission = await validate.ValidateUser(req, "delete_users");
  if (!check_permission) return res.status(401).json("Unauthorized");

  const user_id = req.params.id;

  const checkDataSql =
    "SELECT username, email FROM `users` WHERE `user_id` = ?";
    db.query(checkDataSql, [user_id], (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (!result) {
      let err = new Error();
      err.message = "User not Found";
      return res.status(400).json(err.message);
    }

    if (!err && result.length > 0) {
      const sql = "DELETE FROM `users` WHERE `user_id` = ?";
      db.query(sql, [user_id], (err) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(200).json("Success");
      });
    }
  });
}

exports.getRoles = async (req, res) => {
  const check_permission = await validate.ValidateUser(req, "user-show");
  if (check_permission) return res.status(401).json("Unauthorized");

  const sql =
  "select users.username, users.user_id, roles.id as role_id, roles.name as role_name, modulos.id as modulo_id, modulos.nome as modulo_nome, permissions.id as permission_id, permissions.name as permission_name from `users`, `roles`, `modulos`, `permissions` where users.role_id = roles.id and roles.id = modulos.id and roles.id = permissions.id";
  db.query(sql, async (err, results) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (results && results.length > 0) {
      const all_users = [...new Set(results.map((user) => user.user_id))];
      const response = {
        users: await Promise.all(
          all_users.map(async (user) => {
            const username = results.filter((user1) => user1.user_id == user)[0]
              .username;
            const role = await validate.GetUserRole(username);
            const permissions = await validate.GetUserPermissions(username);
            return {
              user_id: user,
              username,
              role,
              permissions: permissions,
            };
          })
        ),
        roles: [...new Set(results.map((user) => user.role_name))].map((r) => {
          return {
            name: r,
            id: results.filter((user1) => user1.role_name == r)[0].role_id,
            modulos: [
              ...new Set(
                results
                  .filter((user) => user.role_name == r)
                  .map((r_n) => r_n.modulo_nome)
              ),
            ],
            permissions: [
              ...new Set(
                results
                  .filter((user) => user.role_name == r)
                  .map((r_n) => r_n.permission_name)
              ),
            ],
          };
        }),
        permissions: [...new Set(results.map((user) => user.permission_name))],
      };
      return res.status(200).json(response);
    }
  });
}

exports.getModulos = async (req, res) => {
  const check_permission = await validate.ValidateUser(req, "user-show");
  if (check_permission) return res.status(401).json("Unauthorized");

  const sql =
    "select users.username, users.user_id, roles.id as role_id, roles.name as role_name, modulos.id as modulo_id, modulos.nome as modulo_nome, modulos.img as modulo_img, modulos.sigla as modulo_sigla, permissions.id as permission_id, permissions.name as permission_name from `users`, `roles`, `modulos`, `permissions` where users.role_id = roles.id and roles.id = modulos.id and roles.id = permissions.id";
    db.query(sql, async (err, results) => {
    if (err) {
      return res.status(400).json(err);
    }

    if (results && results.length > 0) {
      const all_users = [...new Set(results.map((user) => user.user_id))];
      const response = {
        users: await Promise.all(
          all_users.map(async (user) => {
            const username = results.filter((user1) => user1.user_id == user)[0]
              .username;
            const role = await validate.GetUserRole(username); 
            const permissions = await validate.GetUserPermissions(username);
            return {
              user_id: user,
              username,
              role, 
              permissions: permissions,
            };
          })
        ),
        roles: [...new Set(results.map((user) => user.role_name))].map((r) => {
          return {
            name: r,
            id: results.filter((user1) => user1.role_name == r)[0].role_id,
            modulos: [
              ...new Set(
                results
                  .filter((user) => user.role_name == r)
                  .map((r_n) => r_n.modulo_nome)
              ),
            ],
            permissions: [
              ...new Set(
                results
                  .filter((user) => user.role_name == r)
                  .map((r_n) => r_n.permission_name)
              ),
            ],
          };
        }),
        permissions: [...new Set(results.map((user) => user.permission_name))],
      };
      return res.status(200).json(response);
    }
  });
}
