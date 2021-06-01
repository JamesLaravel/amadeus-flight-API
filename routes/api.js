const router = require("express").Router()
const { resolveInclude } = require("ejs");
const redisController = require('../Controllers/redisController');
const AmadeusController = require('../Controllers/AmadeusController');
const cacheMiddleware = require('../middlewares/Redis_cache');

router.get('/repos/:username',cacheMiddleware, redisController.getRepos);

router.get('/flight/get-flight', AmadeusController.getflightOffers);
module.exports = router;