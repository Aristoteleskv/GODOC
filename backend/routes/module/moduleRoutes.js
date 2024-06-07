const express = require("express");
const router = express.Router();
const db = require("../../config/database/db");  

 
router.get("/modulos", getModulos);
//get pastas
router.get("/",(req, res) => {
  db.query(
    `select * from modulos`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );

});
 
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(`select * from modulos where id = '${id}'`, (err, results) => {
    if (err) console.log(err);
    else res.json(results[0]);
  });
});

async function getModulos(req, res) {
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
              modulo, 
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
module.exports = router;

