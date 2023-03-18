const express = require('express');

const app = express();
const PORT = 4000;

console.log("__dirname", __dirname)

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 