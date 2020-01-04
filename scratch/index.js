const { fork } = require('child_process');
const { argv } = require('yargs');
const { port } = argv;
const args = [`--port=${port}`];
fork('./server.js', args);
