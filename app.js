const express = require("express")

const mongoose = require('mongoose')

const dotenv = require('dotenv').config();

const { MONGODB } = require('./config');

const routeDefinitions = require('./routes/main')



//set up express app
const app = express()
//app.use(express.json());    

if(dotenv.error){
    throw dotenv.error
}


//connection to monogodb
//check if db connection is correct then start serve

mongoose.connect(MONGODB, {

    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
}).then( () => {

    return app.listen(process.env.PORT);
}).then( () => {
    console.log("Server started listening on port: 3000")
}).catch(err => console.log(err.message));

mongoose.Promise = global.Promise;


//middlewares
// app.use(express.urlencoded({ extended: true}));

// app.use(express.static("public"));

// app.set("view engine", "ejs");

//set middleware

routeDefinitions(app);

//error handling middleware

app.use((err, req, res, next) => {
    if(err instanceof ExpressValidationError){
        return res.status(400).send({
            errors: err.toJSON()
        })
    }
    res.status(422).send({error: err.message})

})
