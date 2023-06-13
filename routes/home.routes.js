const router = require('express').Router();
const urls = require('../controllers/url.controllers')
const ShortUrl = require('../models/url.models')

router.get('/:shortId', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortId })
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
})



router.post('/', async(req, res) => {
    const shortUrls = await urls.getAllUrls();
    res.render('index', { shortUrls: shortUrls });
})

router.get('/', async(req, res) => {
    const shortUrls = await urls.getAllUrls();
    res.render('index', { shortUrls: shortUrls });
})

module.exports = router;