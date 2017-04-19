const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const app = express();
app.use('/static', express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'test.html'));
});

const worker1 = () => {
  let x = 0;
  for (let i = 0; i < 4000000; i += 1) {
    x += i;
  }
  return x;
};
const worker2 = () => {
  let x = 0;
  for (let i = 0; i < 200000000; i += 1) {
    x += i;
  }
  return x;
};
const worker3 = () => {
  let x = 0;
  for (let i = 0; i < 900000000; i += 1) {
    x += i;
  }
  return x;
};
const worker4 = () => {
  let x = 0;
  for (let i = 0; i < 800000000; i += 1) {
    x += i;
  }
  return x;
};
const worker5 = () => {
  let x = 0;
  for (let i = 0; i < 300000000; i += 1) {
    x += i;
  }
  return x;
};




class Clients {
  constructor() {
    this.list = [];
    this.newClient = (ws) => {
      this.list.push(new Client(ws, this.list.length, 'Ted'));
    };
  }
}

class Client {
  constructor(ws, id, username) {
    this.socket = ws;
    this.id = id;
    this.username = username;
    this.quality = null;
    this.tasks = [];
    this.assignTask = task => this.tasks.push(task);
  }
}

class Tasks {
  constructor() {
    this.list = [];
    this.addTask = task => this.list.push(task);
    this.getTask = () => this.list.shift();
  }
}

const tasks = new Tasks();
const clients = new Clients();

tasks.addTask(worker1);
tasks.addTask(worker2);
tasks.addTask(worker3);
tasks.addTask(worker4);
tasks.addTask(worker5);

wss.on('connection', (ws) => {
  clients.newClient(ws);
  if (tasks.list.length > 0) {
    const currentTask = tasks.getTask();
    clients.list[clients.list.length - 1].assignTask(currentTask);
    ws.send(currentTask.toString());
  }
  // console.log(clients.list.length);
  ws.on('message', (message) => {
    console.log(message);
  });
});

app.listen(3000, () => console.log('Listening on port 3000'));
