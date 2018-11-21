// var data = [
//     {item: 'get milk'}, 
//     {item: 'walk dog'},
//     {item: 'kick some coding ass'}
// ]
var mongoose = require('mongoose');
// connect to mongoDB database
mongoose.connect('mongodb://test:test123@ds043487.mlab.com:43487/todo-1');

// create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: "buy flowers"}).save((err) => {
//     if(err) throw err;
//     console.log('item saved');
// });

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false})
module.exports = (app) => {
    app.get('/todo', (req,res) => {
        Todo.find({}, (err,data) => {
            if (err) throw err;
            res.render("todo", {todo: data});
        }); // get data from mongoDB.
    });

    app.post('/todo', urlencodedParser,(req,res) => {
        // post data to mongodb
        var newTodo = Todo(req.body).save((err,data) => {
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        //delete the request item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data) => {
            if(err) throw err;
            res.json(data);
        });
    });
}