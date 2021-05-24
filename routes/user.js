const router = require('express').Router()

const bodyParser = require('body-parser');

const clientChecker = require('../middlewares/checkHeader');

const authControlller = require('../Controllers/authController')

const jsonParser = bodyParser.json()

router.post('/register', authControlller.register);

router.post('/login', authControlller.login);


module.exports = router;