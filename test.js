window.onload = () => {
  let first = null;
  const test = document.getElementById('test');
  test.innerHTML = 'Hello World';
  test.onclick = () => {
    first = 'test';
    console.log(first);
  };
  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = (event) => {
    if (window.Worker) {
      const myWebWorker = new Worker('./static/worker.js');
      myWebWorker.postMessage(event.data);
      console.log('message sent to worker');
      myWebWorker.onmessage = (e) => {
        console.log('message received from worker ', e.data);
        ws.send(e.data);
      };
    }
  };
};
