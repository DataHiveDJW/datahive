onmessage = (e) => {
  console.log('message received');
  const result = e.data;
  const func = new Function([], 'return '.concat(result.toString()))();
  console.log('Sent message back');
  postMessage(func());
  close();
};
