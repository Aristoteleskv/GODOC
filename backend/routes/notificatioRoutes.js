const express = require("express");
const router = express.Router(); 
// Configuração do socket.io no NodeJS  

const db = require("../config/database/db");
const notificacoesController = require("../controllers/notificationController");


router.post("/enviar-notificacao", notificacoesController.registar_registarn);
router.get("/", getListNotification);
router.put("/:id", getNotification);
 
 
 


async function getListNotification(req, res) {
  try {
    db.query(`
      SELECT 
        n.id AS id,
        n.de AS de,
        n.para AS para,
        n.tipo AS tipo,
        n.status AS status,
        n.mensagem AS mensagem,
        n.info AS info,
        n.shared_file_id,
        n.data AS notification_date, 
        n.lida AS read_status,
        n.naoLidas AS unread_status,
        u.id AS user_id,
        u.username,
        u.full_name,
        sf.id AS shared_file_id,
        sf.file_id,
        sf.contact_id,
        sf.visto AS seen_status,
        sf.created_at AS shared_file_created_at,
        f.id AS file_id,
        f.file_name,
        f.type AS file_type,
        f.size AS file_size,
        f.id_pasta AS folder_id,
        f.tmp_name AS temp_file_name,
        f.created_at AS file_created_at,
        f.update_at AS file_updated_at
      FROM 
        notificacoes n
        JOIN users u ON n.de = u.id OR n.para = u.id
        JOIN shared_files sf ON n.shared_file_id = sf.id
        JOIN files f ON sf.file_id = f.id
    `, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar notificações' });
      } else {
        res.json(results); // Modificado para enviar todos os resultados
      }
    });
     
    // Emitir resultados para o socket.io se necessário
    // io.emit('notification', results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
};


async function getNotification(req, res) {
  try {
    const userId = req.params.userId;
    const checkDataSql = `
    SELECT 
      n.id AS notification_id,
      n.de AS de,
      n.para AS para,
      n.tipo AS tipo,
      n.status AS status,
      n.mensagem AS message,
      n.info AS info,
      n.shared_file_id,
      n.data AS notification_date,
      n.datafim AS notification_end_date,
      n.lida AS read_status,
      n.naoLidas AS unread_status,
      u.id AS user_id,
      u.username,
      u.full_name,
      sf.id AS shared_file_id,
      sf.file_id,
      sf.contact_id,
      sf.visto AS seen_status,
      sf.created_at AS shared_file_created_at,
      f.id AS file_id,
      f.file_name,
      f.type AS file_type,
      f.size AS file_size,
      f.id_pasta AS folder_id,
      f.tmp_name AS temp_file_name,
      f.created_at AS file_created_at,
      f.update_at AS file_updated_at
    FROM 
      notificacoes n
      JOIN users u ON n.de = u.id OR n.para = u.id
      JOIN shared_files sf ON n.shared_file_id = sf.id
      JOIN files f ON sf.file_id = f.id
    WHERE 
      n.para = ? OR n.de = ?`;
     // Ajuste para corresponder ao seu sistema de autenticação
     db.query(checkDataSql,[userId, userId], (err, results) => {
        if (err) console.log(err);
        else res.json(results);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

 module.exports = router;
