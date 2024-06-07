const express = require("express");
const logger = require("morgan");
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const cors = require('cors');
const Sockets = require('./models/sockets-task');

class Cerver {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.env = process.env.NODE_ENV || 'development';
        
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, { cors: { origin: '*' } });
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors({ origin: '*', methods: ['GET', 'POST'] })); // Especificar métodos permitidos
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));  // Mudar para true para suportar objetos aninhados
        this.app.use('/uploads', express.static('uploads'));
    }

    configureSockets() {
        new Sockets(this.io);
    }

    routes() { // Renomear para 'routes' para seguir convenções
        const indexRouter = require('../routes/index');
        this.app.use('/', indexRouter);
    }

    execute() {
        this.middlewares();
        this.configureSockets();
        this.routes();
		this.server.listen(this.port, () => {
            console.log(`Server running on port: ${this.port} | Environment: ${this.env}`);
        });
    }
}

module.exports = Cerver;
