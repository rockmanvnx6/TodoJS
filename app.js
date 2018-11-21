var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

app.set('view engine', 'ejs');
app.use('/assets', express.static('./public/assets'));
todoController(app);

app.listen(3000);
console.log('localhost:3000');