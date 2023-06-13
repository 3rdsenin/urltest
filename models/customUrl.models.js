const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const shortId = require('shortid');
const uuid = require('uuid');

const generateQRCode = require('../utils/functions')




const urlCSchema = new Schema({
    id: ObjectId,
    userId: {
        type: String,

    },
    domain: {
        type: String,
        required: true
    },
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
    qrcode: {
        type: String,

    },

    clicks: {
        type: Number,
        required: true,
        default: 0

    }
})

urlCSchema.post('save', (doc, next) => {

    next();
});

urlCSchema.pre('save', async function(next) {
    const shortUrl = await shortId.generate();
    this.short = this.domain + '/' + shortUrl;

    const qrcodedata = await generateQRCode(this.short);
    this.qrcode = qrcodedata;

    next();
})

module.exports = mongoose.model('urlCSchema', urlCSchema);