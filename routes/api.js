const router = require("express").Router()

const bodyParser = require('body-parser');

let jsonParser = bodyParser.json();


let urlencodedParser = bodyParser.urlencoded({extended:false});

const AmadeusController = require('../Controllers/AmadeusController')

router.get('flightOffer', urlencodedParser, AmadeusController.getflightOffers);

module.exports = router;