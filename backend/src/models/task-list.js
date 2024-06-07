const Task = require("./task");

class TasksList {
  constructor() {
    this.tasks = [new Task("Learn Angular", "#ddd"), new Task("Practice React", "#fefefe")];
  }

  
  createTask(name, cor) {
    const newTask = new Task(name, cor);
    this.tasks.push(newTask);
    return this.tasks;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  completeTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      return (task.completed = !task.completed);
    }
  }
  updateTask(id, newName, newcor) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.name = newName;
      task.cor = newcor;
    }
  }
  getTasks() {
    return this.tasks;
  }

  //notificação
 getNotifica() {
    return this.notifica;
  }
}

module.exports = TasksList;
