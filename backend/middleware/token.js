const jsonwebtoken = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");
const nconf = require("../config");
 const crypto = require('crypto');
 
 
 function getTokenFromHeaderOrQuery(req) {
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}


const token = { 
  required: jwt({
    secret: nconf.get("jwtSecret"),
    algorithms: ["HS256"], 
    userProperty: "payload",
    getToken: getTokenFromHeaderOrQuery,
  }),
  generate: function (id, username, role, permissions = []) {
    const expiresIn = 24 * 60 * 60; // 24 hours in seconds
    return jsonwebtoken.sign(
      {
        id: id,
        username: username,
        role: role,
        permissions: permissions,
        exp: Math.floor(Date.now() / 1000) + expiresIn,
      },
      nconf.get("jwtSecret")
    );
  },
};

module.exports = token;
