const { registarNotificacoes } = require("../services/notifiService"); 
const db = require("../config/database/db");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const http = require('http'); 

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
 

exports.notificacaoLida = async (req, res) => {
  //const check_permission = await validate.ValidateUser(req, "read_users");
  //if (!check_permission) return res.status(401).json("Unauthorized");

  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, {
    lido: true,
    dataDeVisualizacao: new Date()
  });
  // Emitir um evento para o cliente via socket.io
  io.emit('notificacao-lida', { id });
  res.status(200).send('Notificação marcada como lida');
};


exports.notificacaoNLida = async (req, res) => {
  const userId = req.user.id; // Assumindo que você tem o ID do usuário disponível
  const count = await Notification.countDocuments({ userId: userId, lido: false });
  res.json({ naoLidas: count });
};
 
exports.registar_registarn = async (req, res, next) => {
  const {de, para,shared_file_id, mensagem} = req.body;

  registarNotificacoes({de, para,shared_file_id, mensagem})
    .then((result) => {
      const { statusCode = 200, message, data} = result;
      res.status(statusCode).send({ message, data});
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
 
 //get pastas 
 exports.getnotifi = async (req, res) => {
  try { 
    db.query(
      `SELECT * FROM notificacoes`,
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        res.json(results);
        io.emit('notificacoes', results );
      }
    );
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
}
   
 
}
  

exports.getListNotification = async (req, res) => {
  try {
     // Substitua 'req.user.id' pelo método correto de acordo com o seu sistema de autenticação
     const userId = req.user.id; // ou req.session.userId, ou outro caminho dependendo do seu sistema
    db.query(
      `SELECT 
        n.id AS notification_id,
        n.de AS from_user_id,
        n.para AS to_user_id,
        n.tipo AS type,
        n.status AS status,
        n.mensagem AS message,
        n.info AS info,
        n.data AS date,
        n.datafim AS end_date,
        n.lida AS read,
        n.naoLidas AS unread,
        u_de.username AS from_username,
        u_de.full_name AS from_full_name,
        u_para.username AS to_username,
        u_para.full_name AS to_full_name,
        sf.id AS shared_file_id,
        sf.file_id AS file_id,
        sf.contact_id AS contact_id,
        sf.visto AS seen,
        sf.created_at AS shared_file_created_at,
        f.file_name AS file_name,
        f.type AS file_type,
        f.size AS file_size,
        f.id_pasta AS folder_id,
        f.tmp_name AS temp_name,
        f.created_at AS file_created_at,
        f.update_at AS file_updated_at
      FROM 
        notificacoes n
        JOIN users u_de ON n.de = u_de.id
        JOIN users u_para ON n.para = u_para.id
        JOIN shared_files sf ON n.id = sf.notification_id
        JOIN files f ON sf.file_id = f.id
      WHERE 
        n.para = ? OR n.de = ?`,
      [userId, userId], // Substitua req.user.id pelo ID do usuário atual
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        res.json(results);
        // Emitir resultados para o socket.io se necessário
        // io.emit('notificacoes', results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

 
 


exports.getListNotifica = async (req, res) => {
  try {
    db.query(
      `SELECT 
        n.id AS notification_id,
        n.de AS from_user_id,
        n.para AS to_user_id,
        n.tipo AS type,
        n.status AS status,
        n.mensagem AS message,
        n.info AS info,
        n.data AS date,
        n.datafim AS end_date,
        n.lida AS read,
        n.naoLidas AS unread,
        u_de.username AS from_username,
        u_de.full_name AS from_full_name,
        u_para.username AS to_username,
        u_para.full_name AS to_full_name,
        sf.id AS shared_file_id,
        sf.file_id AS file_id,
        sf.contact_id AS contact_id,
        sf.visto AS seen,
        sf.created_at AS shared_file_created_at,
        f.file_name AS file_name,
        f.type AS file_type,
        f.size AS file_size,
        f.id_pasta AS folder_id,
        f.tmp_name AS temp_name,
        f.created_at AS file_created_at,
        f.update_at AS file_updated_at
      FROM 
        notificacoes n
        JOIN users u_de ON n.de = u_de.id
        JOIN users u_para ON n.para = u_para.id
        JOIN shared_files sf ON n.id = sf.notification_id
        JOIN files f ON sf.file_id = f.id
      WHERE 
        n.para = ? OR n.de = ?`,
      [req.users.id, req.users.id], // Substitua req.user.id pelo ID do usuário atual
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        res.json(results);
        // Emitir resultados para o socket.io se necessário
        // io.emit('notificacoes', results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


exports.getListNotificat = async (req, res) => {
  try {
    // Supondo que 'db' é a sua conexão com o banco de dados
    const { userId, otherUserId1, otherUserId2 } = req.params; // IDs dos usuários como parâmetros da rota

    const query = `
      SELECT 
        n.id AS notificacao_id,
        n.mensagem AS mensagem,
        n.info AS info,
        n.data AS data,
        u.full_name,
        u.username,
        f.file_name,
        f.id AS file_id,
        f.type,
        f.size,
        f.created_at,
        f.shared_with,
        f.approval_needed
      FROM 
        notificacoes n
        LEFT JOIN users u ON u.id = n.de OR u.id = n.para
        LEFT JOIN files f ON f.id = n.file_id
      WHERE 
        (n.para = ? OR n.para = ? OR n.para = ?)
        AND f.shared_with LIKE CONCAT('%', n.para, '%')
        AND f.approval_needed = 1
    `;

    db.query(query, [userId, otherUserId1, otherUserId2], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


 