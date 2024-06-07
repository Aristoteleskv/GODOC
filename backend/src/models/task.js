const { v4: uuidV4 } = require('uuid');

class Task {
	constructor(name, cor) {
		this.id = uuidV4();
		this.name = name;
		this.cor = cor;
		this.completed = true;
	}
}

module.exports = Task;
