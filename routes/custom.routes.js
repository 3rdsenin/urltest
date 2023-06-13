const router = require('express').Router();
const urls = require('../controllers/customUrl.controllers')
const ShortUrl = require('../models/url.models')

router.post('/', urls.createCShortUrl)

router.get('/', async(req, res) => {
    const shortUrls = await urls.getAllCUrls();
    res.render('custom', { shortUrls: shortUrls });
})

module.exports = router;