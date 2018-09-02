// Makes use of EvetEmitter to communicate with the client
const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();
    this.tasks = {};
    this.taskId = 1;

    process.nextTick(() => {
      this.emit('response', 'Type a command (type help to list available commands)');
    });

    client.on('command', (command, args) => {
      switch (command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
          this[command](args);
          break;
        default:
          this.emit('response', 'Unknown command');
      }
    });
  }

  tasksString() {
    return Object.keys(this.tasks).map(key => {
      return `${key}: ${this.tasks[key]}`;
    }).join('\n');
  }

  help() {
    const helpText = `Availble commands:
add <task-name> - Adds the task passed as arguments
ls - Lists all the tasks
delete <task-id> - deletes the provided task`;

    this.emit('response', helpText);
  }

  add(args) {
    this.tasks[this.taskId] = args.join(' ');
    this.emit('response', `Added the task ${this.taskId}`);
    this.taskId++;
  }

  ls() {
    this.emit('response', `Tasks:\n${this.tasksString()}`);
  }

  delete(args) {
    delete (this.tasks[args[0]]);
    this.emit('response', `Deleted task ${args[0]}`);
  }
}

module.exports = client => new Server(client);