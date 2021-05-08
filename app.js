const express = require("express")

const mongoose = require('mongoose')

const { MONGODB } = require('./config');



//set up express app
const app = express()


//connection to monogodb
//check if db connection is correct then start serve

mongoose.connect(MONGODB, {

    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
}).then( () => {

    return app.listen(3000);
}).then( () => {
    console.log("Server started listening on port: 3000")
}).catch(err => console.log(err.message));

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
app.use('/api/users', require("./routes/user"))



//error handling middleware

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message})
})

//server configutation
//app.listen(3000, () => console.log("Server started listening on port: 3000"))