const TaskList = require('./task-list');
const db = require("../../config/database/db");

class Sockets {
	constructor(io) {
		this.io = io;

		this.tasklist = new TaskList();

		this.socketsEvents();
	}
	handleError(err, mensagem) {
		console.error('Erro:', err);
		this.io.emit('notificacao-falha', { error: err, mensagem });
	}


	socketsEvents() {
		this.io.on('connection', socket => {

			socket.on('enviar-notificacao', async (data) => {
				try {
					// Desestruturação dos dados recebidos
					const { de, para, shared_file_id, mensagem } = data;

					// Insere a notificação no banco de dados com os campos de, para e mensagem
					const query = 'INSERT INTO notificacoes (de, para, shared_file_id, mensagem) VALUES ?';
					const values = para.map(para => [de, para.id, shared_file_id, mensagem]);
					await db.query(query, [values]);
					console.log('Notificação salva no banco de dados:', mensagem);

					// Emite um evento para todos os clientes informando que uma nova notificação foi recebida
					this.io.emit('notificacao-recebida', data);

				} catch (err) {
					// Trata o erro
					this.handleError(err, data);
				}
			});

			//socket.emit('notificacao-recebida', this.tasklist.getNotifica());

			// Função para emitir notificações
			const emitirNotificacoes = () => {
				db.query('SELECT * FROM notificacoes', (err, results) => {
					if (err) throw err;

					// Emitindo os dados para o cliente
					socket.emit('notificacao-recebida', results);
				});
			};

			// Chame a função emitirNotificacoes conforme necessário
			socket.emit('notificacao-recebida', emitirNotificacoes());


			socket.on('marcar_como_lido', (idNotificacao) => {
				// Atualizar o status da notificação no banco de dados
				const query = 'UPDATE notificacoes SET lido = true, dataLido = NOW() WHERE id = ?';
				db.query(query, [idNotificacao], (err, result) => {
					if (err) throw err;
					// Emitir confirmação de que a notificação foi lida
					socket.emit('notificacao_lida', idNotificacao);
				});
			});
			socket.on('enviar-notificaascao', ({ notificacao }) => {
				this.tasklist.createTask(notificacao);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});


			socket.emit('getTasks', this.tasklist.getTasks());

			socket.on('deleteTask', ({ id }) => {
				this.tasklist.deleteTask(id);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});

			socket.on('createTask', ({ name, cor }) => {
				this.tasklist.createTask(name, cor);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});

			socket.on('completeTask', ({ id }) => {
				this.tasklist.completeTask(id);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});
			socket.on('updateTask', (id, newName, newcor) => {
				this.tasklist.updateTask(id, newName, newcor);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});


			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}
}

module.exports = Sockets;
