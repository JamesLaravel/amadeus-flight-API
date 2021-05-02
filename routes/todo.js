const router =  require('express').Router()
const Todo = require("../models/Todo")

const bodyParser = require('body-parser');

let jsonParser = bodyParser.json();

let urlencodedParser = bodyParser.urlencoded({extended:false});


const token = require('./../middlewares/checkHeader');


router.get('/testheader' ,token,function(req, res){
    res.send(req.client);
})

//routes
router.post('/add/todo', (req, res) => {

    const {todo} = req.body;

    const newTodo = new Todo({todo})

    //save the todo

    newTodo.save()
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => console.log(err));
})

.get("/delete/todo/:_id", (req, res) => {

    const {_id} = req.params;

    Todo.deleteOne({_id})
            .then(() => {
                console.log("Deleted Todo Successfully")
                res.redirect("/")
            })
            .catch((err) => console.log(err));
})

.post('/new/todo', urlencodedParser, function(req, res){
    res.send({
        type:"POST",
        name: JSON.stringify(req.body.name, null, 2),
        rank: JSON.stringify(req.body.rank, null, 2)
    });
})

.put('/update/todo/:id', function(req, res){
    res.send({type:'PUT'})
})

.delete('/delete/:id', function(req, res){
    res.send({type:'DELETE'})
})

module.exports = router