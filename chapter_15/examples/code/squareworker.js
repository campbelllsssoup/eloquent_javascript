addEventListener('message', e => {
  postMessage(e.data * e.data);
});