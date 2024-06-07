const NotificaList = require('./notifica-list');
const db = require("../../config/database/db"); 

class Notificacao_Sockets {
	constructor(io) {
		this.io = io;
 
		this.notificaList = new NotificaList(); 

		this.socketsEvents();
	}
	handleError(err, mensagem) {
		console.error('Erro:', err);
		this.io.emit('notificacao-falha', { error: err, mensagem });
	  }
	
	
	socketsEvents() {
		this.io.on('connection', socket => {
		 

			socket.on('enviar-notificacao', async (mensagem) => {
				try {
				  await db.query('INSERT INTO notificacoes (mensagem) VALUES (?)', [mensagem]);
				  console.log('Notificação salva no banco de dados:', mensagem);
				  this.io.emit('notificacao-recebida', mensagem);
				  
				} catch (err) {
				  this.handleError(err, mensagem);
				}
			  });

			  socket.emit('notificacao-recebida', this.notificaList.getNotifica());

			// Lógica para enviar e receber notificações
			 
			socket.on('nova_notificacaos', (notificacao) => {
				// Salvar a notificação no banco de dados
				const query = 'INSERT INTO notificacoes SET ?';
				db.query(query, notificacao, (err, result) => {
				  if (err) throw err;
				  // Emitir a notificação para o usuário específico
				  this.io.to(notificacao.para).emit('receber_notificacao', notificacao);
				});
			  });


			  socket.on('marcar_como_lido', (idNotificacao) => {
				// Atualizar o status da notificação no banco de dados
				const query = 'UPDATE notificacoes SET lido = true, dataLido = NOW() WHERE id = ?';
				db.query(query, [idNotificacao], (err, result) => {
				 
				  socket.emit('notificacao_lida', idNotificacao);
				});
			  });


 

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}
}

module.exports = Notificacao_Sockets;
