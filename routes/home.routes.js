const router = require('express').Router();
const urls = require('../controllers/url.controllers')
const ShortUrl = require('../models/url.models')
const requestip = require('../middleware/requestip.middleware')
const date_time = require('../middleware/requestdatetime.middleware')
const { isAuthorized, getUserIdFromToken, } = require('../utils/functions')
const redis = require('redis');

const redisClient = redis.createClient({
    password: process.env.redis_password,
    socket: {
        host: process.env.redis_host,
        port: process.env.redis_port
    }
});


redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.log(err.message);
})


const cache = async(req, res, next) => {
    await redisClient.get("urls", (err, data) => {
        if (err) { console.log(err) }
        if (data !== null) {
            console.log("cache hit");
            next()
        } else {
            console.log("cache miss");
            next();
        }
    })
}
router.get('/404', async(req, res) => {
    res.render('404')
})

router.get('/:shortId', requestip.ipMiddleware, async(req, res) => {


    const shortUrl = await ShortUrl.findOne({ domain: req.params.shortId })

    if (shortUrl == null) { return res.render('404'); } else {

        let historyObj = { ip: req.clientIp, time: date_time.dateNow() }
            //console.log(historyObj);
        shortUrl.history.push(historyObj)
            //console.log(shortUrl.history)
        shortUrl.clicks++;
        shortUrl.save();


        res.redirect(shortUrl.full);
    }
})



router.post('/', isAuthorized, async(req, res) => {
    const userID = getUserIdFromToken(req.session.token);
    const value = await redisClient.get(`urls?userID=${userID}`);
    if (value) {
        console.log("hit");
        res.render('index', { shortUrls: JSON.parse(value) });
    } else {
        console.log("miss");
        const userID = getUserIdFromToken(req.session.token);
        const shortUrls = await urls.getAllUrls(userID);
        await redisClient.setEx(`urls?userID=${userID}`, 120, JSON.stringify(shortUrls));
        res.render('index', { shortUrls: shortUrls });
    }
})

router.get('/', isAuthorized, async(req, res) => {
    const userID = getUserIdFromToken(req.session.token);
    const value = await redisClient.get(`urls?userID=${userID}`);
    if (value) {
        console.log("hit");
        res.render('index', { shortUrls: JSON.parse(value) });
    } else {
        console.log("miss");
        const userID = getUserIdFromToken(req.session.token);
        const shortUrls = await urls.getAllUrls(userID);
        await redisClient.setEx(`urls?userID=${userID}`, 120, JSON.stringify(shortUrls));
        res.render('index', { shortUrls: shortUrls });
    }

})


module.exports = router;