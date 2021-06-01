const express = require("express")

const mongoose = require('mongoose')

const dotenv = require('dotenv').config();

const { MONGODB } = require('./config');

const routeDefinitions = require('./routes/main')

const auth = require('./middlewares/auth');

const cors = require('cors');




//set up express app
const app = express()
app.use(express.json());    
app.use(cors());
if(dotenv.error){
    throw dotenv.error
}


//connection to monogodb
//check if db connection is correct then start serve

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
}).then( () => {
    return app.listen(process.env.PORT);
}).then( () => {
    console.log("Server started listening on port: 3000")
}).catch(
    err => console.log(err.message)
);

mongoose.Promise = global.Promise;


//middlewares
// app.use(express.urlencoded({ extended: true}));

// app.use(express.static("public"));

// app.set("view engine", "ejs");

//set middleware

app.use('/api/v1/protected', auth, (req, res)=> {
    res.end(`Hi ${req.user.firstname}, you are authenticated!`);
})

    routeDefinitions(app);

//error handling middleware

app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {

    const status = err.status || 500;

    res.status(status).json({error: {
        error: true,
        statue:0,
        message: err.message
    }})
    
})


