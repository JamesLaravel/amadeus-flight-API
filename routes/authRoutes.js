const router = require('express').Router()

const bodyParser = require('body-parser');

const clientChecker = require('../middlewares/checkHeader');

const authControlller = require('../Controllers/authController')

let jsonParser = bodyParser.json()

router.post('/register', clientChecker, authControlller.register);


router.post('/login', jsonParser, (res, req, next) => {

});

module.exports = router;