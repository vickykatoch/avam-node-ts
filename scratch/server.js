const app = require('express')();
const { argv } = require('yargs');

console.log(process.argv);
console.log('Port : ' + argv.port);

app.listen(argv.port, () => {
  console.log('Server started : ' + argv.port);
});
