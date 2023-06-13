const urlSchema = require('../models/url.models');


const createShortUrl = async(req, res) => {
    await urlSchema.create({ full: req.body.fullUrl })
    res.redirect('/');
}

const getAllUrls = async(req, res) => {
    const allUrls = await urlSchema.find();
    return allUrls;
}



module.exports = { createShortUrl, getAllUrls }