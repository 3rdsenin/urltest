const qrCode = require('qrcode');

const generateQRCode = async(url) => {
    try {
        const qr = await qrCode.toDataURL(url);
        return qr;
    } catch (err) {
        console.error(err)
    }
}

module.exports = generateQRCode