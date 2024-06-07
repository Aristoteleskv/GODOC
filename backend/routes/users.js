const express        = require("express");
const router         = express.Router();
const userController = require("../controllers/userController");  
const token          = require("../middleware/token");

const nconf = require("../config");  
 
router.get(   "/",        userController.getAllUsers);
router.post(  "/",        userController.addUser);
router.put(   "/:id",     userController.editUser);
router.delete("/:id",     userController.deleteUser); 
router.get(   "/user",    userController.getUser); 
router.get(   "/roles",   userController.getRoles);
router.get(   "/modulos", userController.getModulos);
module.exports = router;
 

 
