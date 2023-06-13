const urlCSchema = require('../models/customUrl.models')

const createCShortUrl = async(req, res) => {
    await urlCSchema.create({ full: req.body.fullUrl, domain: req.body.customdomain })
    res.redirect('/');
}

const getAllCUrls = async() => {
    const allUrls = await urlCSchema.find();
    return allUrls;
}



module.exports = { createCShortUrl, getAllCUrls }