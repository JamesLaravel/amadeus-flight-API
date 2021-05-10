const router = require('express').Router();

const Ninja = require('../models/ninja');

const bodyParser = require('body-parser');

let jsonParser = bodyParser.json();

let urlencodedParser = bodyParser.urlencoded({extended:false});

const token = require('./../middlewares/checkHeader');

const AmadeusController = require('../Controllers/AmadeusController')


//get a list of ninjs from the db
router.get('/ninjas', urlencodedParser,token, function(req,res, next){

    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000, 
        spherical:true,
        distanceField: "dist.calculated"
    }).then(function(ninajs){
        res.send(ninajs)
    })
});


//add a new ninja to the db
router.post('/ninjas',jsonParser, function(req, res, next){
    
    Ninja.create(req.body)
            .then(function(ninja){
                res.send(ninja)
            }).catch(next);
});

//update a ninja in the db
router.put('/ninjas/:_id',jsonParser, function(req, res, next){

    Ninja.findByIdAndUpdate({_id:req.params._id}, req.body, {new:true})
            .then(function(ninja) {
                res.send(ninja)
            }).catch(next);
});

//delete a ninja from the db
router.delete('/ninjas/:_id', jsonParser, function(req, res, next) {
    Ninja.findByIdAndRemove({_id: req.params._id})
            .then(function(ninja){
                res.send(ninja)
            }).catch(next);
});

router.get('/new', jsonParser, AmadeusController.getflightOffers)

//router.get('flightOffer', urlencodedParser, AmadeusController.getflightOffers);

module.exports = router;
