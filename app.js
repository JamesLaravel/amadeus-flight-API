const express = require("express")

const mongoose = require('mongoose')

// const bodyParser = require('body-parser');


//set up express app
const app = express()


//connection to monogodb

mongoose.connect("mongodb://localhost:/node_tutorial", {

    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
});

mongoose.Promise = global.Promise;


//middlewares
// app.use(express.urlencoded({ extended: true}));

// app.use(express.static("public"));

// app.set("view engine", "ejs");

//set middleware


//routes
app.use('/api',require("./routes/index" ))
app.use('/api',require("./routes/todo"))
app.use('/api', require("./routes/ninja"))


//error handling middleware
// app.use(function(err, req, res, next){

//     //console.log(err)    
//     res.status(422).send({error: err.message})
// });

//server configutation
app.listen(3000, () => console.log("Server started listening on port: 3000"))