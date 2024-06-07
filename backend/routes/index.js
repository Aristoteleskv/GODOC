const express = require("express");
const router = express.Router(); 
const authRoute =        require("./auth");
const usersRoute =       require("./users"); 
const pastasRoute =      require("./pastaRoutes"); 
const fileRoutes =       require('./file');
const permissionRoutes = require('./configs/permissionRoutes');
const roleRoutes =       require('./roles');
const moduloRoutes =     require('./module/moduleRoutes');
const departmentsRoutes =     require('./departamentos');
const notificatioRoutes =     require('./notificatioRoutes');

router.use("/api/kv/auth",      authRoute);
router.use("/api/kv/users",     usersRoute); 
//DOC  
router.use("/api/kv/pastas",    pastasRoute);
router.use("/api/kv/files",     fileRoutes);
//C
router.use("/api/kv/permissions", permissionRoutes);
router.use("/api/kv/roles",     roleRoutes);
//M
router.use("/api/kv/modulos",   moduloRoutes);
//M
router.use("/api/kv/departamentos",   departmentsRoutes);
//M
router.use("/api/kv/notificacoes",   notificatioRoutes);

module.exports = router;
