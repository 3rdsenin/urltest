const router = require('express').Router();
const urlControllers = require('../controllers/url.controllers')

router.post('/shortenUrl', urlControllers.createShortUrl)





module.exports = router;