const router = require('express').Router();
const authController = require('../controllers/auth.controllers')

router.get('/signup', (req, res) => {
    res.render('signup', {})
});
router.post('/signup', authController.signup);

router.get('/login', (req, res) => {
    res.render('login')
});

router.all('/logout', (req, res) => {

    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    res.redirect('/')

})


router.post('/login', authController.login);

module.exports = router;