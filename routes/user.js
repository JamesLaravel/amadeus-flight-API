const router = require('express').Router()

const bodyParser = require('body-parser');

const clientChecker = require('../middlewares/checkHeader');

const authControlller = require('../Controllers/authController')

const jsonParser = bodyParser.json()

router.post('/register',jsonParser, clientChecker, authControlller.register);

router.post('/login', jsonParser, clientChecker, authControlller.login);


module.exports = router;