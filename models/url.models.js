const { config } = require('dotenv');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const shortId = require('shortid');
const uuid = require('uuid');
require('dotenv').config();
const generateQRCode = require('../utils/functions')


const urlSchema = new Schema({
    id: ObjectId,
    linkId: {
        type: String,
        default: uuid.v4(),
        required: true
    },
    full: {
        type: String,
        required: true,
    },

    short: {
        type: String,


    },
    shortUrl: {
        type: String,


    },
    qrcode: {
        type: String,

    },

    clicks: {
        type: Number,
        required: true,
        default: 0

    }
})

urlSchema.post('save', (doc, next) => {

    next();
});

urlSchema.pre('save', async function(next) {
    const record = this;
    if (record.qrcode == undefined) {
        const shortid = await shortId.generate()
        const shortUrl = process.env.domain + shortid;
        this.shortUrl = shortUrl;
        this.short = shortid;

        const qrcodedata = await generateQRCode(this.shortUrl);
        this.qrcode = qrcodedata;
        next();

    } else {
        next();
    }


    next();
})



module.exports = mongoose.model('urlSchema', urlSchema);